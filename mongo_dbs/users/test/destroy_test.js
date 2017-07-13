const assert = require('assert');
const User = require('../src/user');

describe('Test each kind on remove action from mongoose', () => {
  let dante;

  beforeEach((done) => {
    dante = new User({ name: 'Dante' });
    dante.save()
      .then(() => done());
  });

  function removeAndAssert(operation, done) {
    operation
      .then(() => User.findOne({ name: 'Dante' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  }

  it('model instance remove', (done) => {
    removeAndAssert(dante.remove(), done);
  });

  it('class method remove', (done) => {
    removeAndAssert(User.remove(), done);
  });

  it('class method findAndRemove', (done) => {
    removeAndAssert(
      User.findOneAndRemove({ name: 'Dante' }),
      done
    );
  });

  it('class method findAndRemoveById', (done) => {
    removeAndAssert(
      User.findByIdAndRemove(dante._id),
      done
    );
  });
});
