import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GitHubService } from '../../github/github.service';
import { Page, Repository } from '../../github/interfaces';

@Component({
  selector: 'gh-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnChanges {
  @Input() repo: Repository;
  pages: Observable<Page[]>;

  constructor(private github: GitHubService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['repo'] && changes['repo'].currentValue) {
      this.pages = this.github.getPages(this.repo);
    }
  }
}
