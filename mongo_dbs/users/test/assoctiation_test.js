const mongoose = require('mongoose');
const User = require('../src/user');
const Comment= require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Association of Schemas', () => {
  let dante, blogPost, comment, testTitle, testComment, testUser;

  beforeEach((done) => {
    dante = new User({
      name: 'Dante',
      posts: [{ title: 'Dante Post' }]
    });

    blogPost = new BlogPost({
      title: 'JS is awesome',
      content: 'Yep, it really is'
    });

    comment = new Comment({
      content: 'Bla bla, i\'m a hater, bla bla bla'
    });

    dante.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = dante;

    Promise.all([dante.save(), blogPost.save(), comment.save()])
      .then(() => { done (); });
  });

  it('Should create blogPosts with an user associated', (done) => {
    User.findOne({ name: 'Dante' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is awesome');
        done();
      });
  });

  it('Saves a full relation tree', (done) => {
    User.findOne({ name: 'Dante' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        testTitle = user.blogPosts[0].title;
        testComment = user.blogPosts[0].comments[0].content;
        testUser = user.blogPosts[0].comments[0].user.name;

        assert(user.name === 'Dante');
        assert(testTitle === 'JS is awesome');
        assert(testComment === 'Bla bla, i\'m a hater, bla bla bla');
        assert(testUser === 'Dante');

        done();
      });
  });
});
