import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TokenStoreService } from '../auth/token-store.service';

import { GitHubContent, GitHubPagesBuild, GitHubRepo } from './api.interfaces';
import { Build, Page, Post, Repository } from './interfaces';

@Injectable()
export class GitHubService {

  constructor(private http: Http, private tokenStore: TokenStoreService) { }

  getRepositories(): Observable<Repository[]> {
    return this.http.get('https://api.github.com/user/repos', this.createOptions())
      .map(response => response.json() as GitHubRepo[])
      .map(repos => repos.map(this.mapApiRepoToRepository));
  }

  getRepository(owner: string, id: string): Observable<Repository> {
    return this.http.get(`https://api.github.com/repos/${owner}/${id}`, this.createOptions())
      .map(response => response.json() as GitHubRepo)
      .map(repo => this.mapApiRepoToRepository(repo));
  }

  getPages(repo: Repository): Observable<Page[]> {
    return this.http.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents`, this.createOptions())
      .map(response => response.json() as GitHubContent[])
      .map(contents => contents.filter(c => c.type === 'file' && c.name.endsWith('.md')))
      .map(pages => pages.map(this.mapApiContentToPage));
  }

  getPosts(repo: Repository): Observable<Page[]> {
    return this.http.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/_posts`, this.createOptions())
      .map(response => response.json() as GitHubContent[])
      .map(contents => contents.filter(c => c.type === 'file'))
      .map(pages => pages.map(this.mapApiContentToPost));
  }

  getBuilds(repo: Repository): Observable<Build[]> {
    return this.http.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/pages/builds`, this.createOptions())
      .map(repsonse => repsonse.json() as GitHubPagesBuild[])
      .map(builds => builds.map(this.mapApiBuildToBuild));
  }

  private mapApiRepoToRepository(repo: GitHubRepo): Repository {
    return {
      id: repo.id,
      name: repo.name,
      hasPages: repo.has_pages,
      owner: {
        id: repo.owner.id,
        login: repo.owner.login
      }
    };
  }

  private mapApiContentToPage(page: GitHubContent): Page {
    return {
      name: page.name
    };
  }

  private mapApiContentToPost(post: GitHubContent): Post {
    return {
      name: post.name
    };
  }

  private mapApiBuildToBuild(build: GitHubPagesBuild): Build {
    return {
      commit: build.commit,
      created: new Date(build.created_at),
      duration: build.duration,
      error: build.error.message ? { message: build.error.message } : null,
      pusher: {
        id: build.pusher.id,
        login: build.pusher.login
      },
      status: build.status,
      updated: new Date(build.updated_at),
      url: build.url
    };
  }

  private createOptions(): RequestOptions {
    const headers = new Headers({
      Authorization: `token ${this.tokenStore.token}`
    });
    return new RequestOptions({ headers: headers });
  }
}
