import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GitHubService } from '../../github/github.service';
import { Build, Repository } from '../../github/interfaces';

@Component({
  selector: 'gh-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})
export class BuildsComponent implements OnChanges {
  @Input() repo: Repository;
  builds: Observable<Build[]>;

  constructor(private github: GitHubService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['repo'] && changes['repo'].currentValue) {
      this.builds = this.github.getBuilds(this.repo);
    }
  }

}
