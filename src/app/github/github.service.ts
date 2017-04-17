import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TokenStoreService } from '../auth/token-store.service';

import { GitHubRepo } from './api.interfaces';
import { Repository } from './interfaces';

@Injectable()
export class GitHubService {

  constructor(private http: Http, private tokenStore: TokenStoreService) { }

  getRepositories(): Observable<Repository[]> {
    return this.http.get('https://api.github.com/user/repos', this.createOptions())
      .map(response => response.json() as GitHubRepo[])
      .map(repos => repos.map(this.mapApiRepoToRepository));
  }

  private mapApiRepoToRepository(repo: GitHubRepo): Repository {
    return {
      id: repo.id,
      name: repo.name,
      hasPages: repo.has_pages
    };
  }

  private createOptions(): RequestOptions {
    const headers = new Headers({
      Authorization: `token ${this.tokenStore.token}`
    });
    return new RequestOptions({ headers: headers });
  }
}
