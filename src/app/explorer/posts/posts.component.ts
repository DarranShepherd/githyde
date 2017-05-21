import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GitHubService } from '../../github/github.service';
import { Post, Repository } from '../../github/interfaces';

@Component({
  selector: 'gh-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnChanges {
  @Input() repo: Repository;
  posts: Observable<Post[]>;

  constructor(private github: GitHubService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['repo'] && changes['repo'].currentValue) {
      this.posts = this.github.getPosts(this.repo);
    }
  }
}
