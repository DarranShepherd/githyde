import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { GitHubService } from '../../github/github.service';
import { RepositoriesComponent } from './repositories.component';

import * as sampledata from '../../../../test/sampledata/service';

describe('RepositoriesComponent', () => {
  let component: RepositoriesComponent;
  let fixture: ComponentFixture<RepositoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoriesComponent, RouterLinkStubDirective ],
      providers: [ { provide: GitHubService, useValue: {
        getRepositories: () => Observable.of(sampledata.repos)
      } }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create one list item per pages repo', () => {
    const expected = sampledata.repos.filter(r => r.hasPages).length;
    expect(fixture.debugElement.queryAll(By.css('md-list-item')).length).toBe(expected);
  });

  it('should link to the repo page', () => {
    const directives = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    const links = directives.map(d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    const repos = sampledata.repos.filter(r => r.hasPages);

    expect(links.length).toBe(2);
    expect(links[0].linkParams[0]).toBe('/');
    expect(links[0].linkParams[1]).toBe(repos[0].name);
    expect(links[1].linkParams[0]).toBe('/');
    expect(links[1].linkParams[1]).toBe(repos[1].name);
  });
});

/* tslint:disable */
@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}