const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });

});

afterEach((done) => {
  let collections = Object.keys(mongoose.connection.collections);
  collections.map((c) => {
    mongoose.connection.collections[c].drop(() => {});
  });
  done();
});
