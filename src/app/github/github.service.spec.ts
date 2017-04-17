import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { GitHubService } from './github.service';
import { TokenStoreService } from '../auth/token-store.service';

import * as sampledata from '../../../test/sampledata/api';

describe('GitHubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        GitHubService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: TokenStoreService, useValue: { token: 'githubAccessToken' } }
      ]
    });
  });

  it('should add token to headers', inject([GitHubService, XHRBackend], (service: GitHubService, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.headers.get('Authorization')).toEqual('token githubAccessToken');
    });
    service.getRepositories().subscribe(() => { });
  }));

  describe('with repositories', () => {
    beforeEach(inject([XHRBackend], (backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(sampledata.repos)
        })));
      });
    }));

    it('should get repositories from GitHub API', inject([GitHubService], (service: GitHubService) => {
      service.getRepositories().subscribe(r => {
        expect(r.length).toBe(sampledata.repos.length);
      });
    }));

    it('should set the hasPages flag', inject([GitHubService], (service: GitHubService) => {
      service.getRepositories().subscribe(r => {
        expect(r.filter(x => x.hasPages).length).toBe(sampledata.repos.filter(x => x.has_pages).length);
      });
    }));
  });
});
