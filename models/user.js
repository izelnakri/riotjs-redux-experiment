'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password_digest: DataTypes.STRING
  }, {
    hooks: {
        beforeCreate: function(user, options) {
            if (!user.password) {
                return sequelize.Promise.reject("Password can't be blank");
            }
            // user.password_digest = user.password
        },

    },
    classMethods: {
      associate: function(models) {

        // associations can be defined here
      }
    }
  });
  return User;
};
