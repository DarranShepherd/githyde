import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GitHubService } from '../../github/github.service';
import { Repository } from '../../github/interfaces';

@Component({
  selector: 'gh-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  repo: Repository;

  constructor(private route: ActivatedRoute, private github: GitHubService) { }

  ngOnInit() {
    this.route.params
      .switchMap(p => this.github.getRepository(p['owner'], p['repo']))
      .subscribe(r => this.repo = r);
  }

}
