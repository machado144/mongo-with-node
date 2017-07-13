const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
  let dante;

  beforeEach((done) => {
    dante = new User({
      name: 'Dante',
      posts: [{ title: 'Dante Post' }]
    });
    done();
  });

  it('should addapt postsCount based on posts number', (done) => {
    dante.save()
      .then(() => User.findOne({ name: 'Dante' }))
      .then((user) => {
        assert(dante.postCount === 1);
        done();
      });
  });
});
