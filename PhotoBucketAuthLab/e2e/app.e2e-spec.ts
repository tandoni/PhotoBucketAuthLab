import { PhotoBucketAuthLabPage } from './app.po';

describe('photo-bucket-auth-lab App', () => {
  let page: PhotoBucketAuthLabPage;

  beforeEach(() => {
    page = new PhotoBucketAuthLabPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
