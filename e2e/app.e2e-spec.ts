import { GithydePage } from './app.po';

describe('githyde App', () => {
  let page: GithydePage;

  beforeEach(() => {
    page = new GithydePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('gh works!');
  });
});
