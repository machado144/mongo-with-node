const assert = require('assert');
const User = require('../src/user');

describe('Check subdocument content', () => {
  let dante;
  let post;

  beforeEach((done) => {
    dante = new User({
      name: 'Dante',
      posts: [{ title: 'Dante Post' }]
    });
    done();
  });

  it('should create an subdocument', (done) => {
    dante.save()
      .then(() => User.findOne({ name: 'Dante' }))
      .then((user) => {
        assert(user.posts[0].title === 'Dante Post');
        done();
      });
  });

  it('should add new posts to specific user', (done) => {
    dante.save()
      .then(() => User.findOne({ name: 'Dante' }))
      .then((user) => {
        user.posts.push({ title: 'Second Dante Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Dante' }))
      .then((user) => {
        assert(user.posts[1].title === 'Second Dante Post');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    dante.save()
      .then(() => User.findOne({ name: 'Dante' }))
      .then((user) => {
        post = user.posts[0]
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Dante' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
