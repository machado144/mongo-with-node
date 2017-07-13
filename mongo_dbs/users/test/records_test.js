const assert = require('assert');
const User = require('../src/user');

describe('Validate invalid records insert', () => {
  it('requires an username', (done) => {
    let user = new User({ name: undefined });
    let validationResult = user.validateSync();
    let { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
    done();
  });

  it('should reject names with less than 2 chars', (done) => {
    let user = new User({ name: 'Da' });
    let validationResult = user.validateSync();
    let { message } = validationResult.errors.name;

    assert(message === 'Name must contains at least 2 chars.');
    done();
  });

  it('disallows invalid records on database', (done) => {
    let user = new User({ name: 'Da' });
    user.save()
      .catch((validationResult) => {
        let { message } = validationResult.errors.name;

        assert(message === 'Name must contains at least 2 chars.');
        done();
      });
  });
});
