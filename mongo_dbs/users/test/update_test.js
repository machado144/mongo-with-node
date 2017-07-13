const assert = require('assert');
const User = require('../src/user');

describe('Using update methods from mongoose', () => {
  let dante;

  beforeEach((done) => {
    dante = new User({ name: 'Dante', likes: 0 });
    dante.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users[0].name === 'notDante');
        assert(users.length === 1);
        done();
      });
  }

  it('instance type using of set n save', (done) => {
    dante.set('name', 'notDante');
    assertName(dante.save(), done);
  });

  it('instance type using of update', (done) => {
    assertName(dante.update({ name: 'notDante' }), done);
  });

  it('class method type of using update', (done) => {
    assertName(
      User.update({ name: 'Dante' }, { name: 'notDante' }),
      done
    );
  });

  it('class method type of using find one record and update', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Dante' }, { name: 'notDante' }),
      done
    );
  });

  it('class method type of using find one record by id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(dante._id, { name: 'notDante' }),
      done
    );
  });

  it('An user can have ther postCount increased by 1', (done) => {
    User.update({ name: 'Dante' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Dante' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});
