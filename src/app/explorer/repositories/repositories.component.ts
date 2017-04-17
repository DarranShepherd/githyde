import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GitHubService } from '../../github/github.service';
import { Repository } from '../../github/interfaces';

@Component({
  selector: 'gh-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
  repositories: Observable<Repository[]>;

  constructor(private github: GitHubService) { }

  ngOnInit() {
    this.repositories = this.github.getRepositories()
      .map(repos => repos.filter(r => r.hasPages));
  }

}
