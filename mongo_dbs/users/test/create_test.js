const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () =>{
  it('saves a user', (done) =>{
    let dante = new User({ name: "Dante" });

    dante.save()
      .then(() => {
        assert(!dante.isNew);
        done();
      })
      .catch((e) => {
        console.warn('Warn => ', e);
      });
  });
});
