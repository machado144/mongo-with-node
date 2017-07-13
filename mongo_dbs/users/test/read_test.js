const assert = require('assert');
const User = require('../src/user');

describe('read data out of the database', () => {
  let dante, goodDante, evilDante, puppyDante, adultDante;

  beforeEach((done) => {
    adultDante = new User({ name: 'AdultDante' });
    badDante = new User({ name: 'BadDante' });
    dante = new User({ name: 'Dante' });
    goodDante = new User({ name: 'GoodDante' });
    puppyDante = new User({ name: 'PuppyDante' });

    Promise.all([dante.save(),
                 goodDante.save(),
                 badDante.save(),
                 puppyDante.save(),
                 adultDante.save()])
      .then(() => done());
  });

  it('Should find all users named Dante', (done) => {
    User.find({ name: 'Dante' })
      .then((users) => {
        assert(users[0]._id.toString() === dante._id.toString());
        done();
      });
  });

  it('Should find an user named Dante', (done) => {
    User.findOne({ _id: dante._id })
      .then((user) => {
        assert(user.name === dante.name);
        done();
      });
  });

  it('Can skip, sort and limit the results set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(3)
      .then((users) => {
        assert(users.length === 3);
        assert(users[0].name === 'BadDante');
        assert(users[1].name === 'Dante');
        assert(users[2].name === 'GoodDante');
        done();
      });
  });
});
