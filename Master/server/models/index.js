const User = require('./user');

module.exports = {
  Users: {
    findAll: function () {
      return Promise.resolve(
        new User({
          id: 1,
          email: process.env.USER,
          password: process.env.PASSWORD
        })
      );
    },

    findOne: function () {
      return Promise.resolve(
        new User({
          id: 1,
          email: process.env.USER,
          password: process.env.PASSWORD
        })
      );
    }
  },

  Secrets: {
    findAll: function () {
      return Promise.resolve([
        {
          id: 1,
          message: 'The clock tolls twice at midnight on the next full moon'
        }
      ]);
    }
  }
}