const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Middleware validations', (done) => {
  let dante, blogPost;

  beforeEach((done) => {
    dante = new User({
      name: 'Dante',
      posts: [{ title: 'Dante Post' }]
    });

    blogPost = new BlogPost({
      title: 'JS is awesome',
      content: 'Yep, it really is'
    });

    dante.blogPosts.push(blogPost);

    Promise.all([dante.save(), blogPost.save()])
      .then(() => { done (); });
  });

  it('users clean up dangling blogposts on remove', (done) => {
    dante.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
