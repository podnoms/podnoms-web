import { PodNoms.WebPage } from './app.po';

describe('pod-noms.web App', () => {
  let page: PodNoms.WebPage;

  beforeEach(() => {
    page = new PodNoms.WebPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
