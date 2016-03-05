'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.VIRTUAL,
            set: function (password) {
                var self = this;
                self.setDataValue('password', password);
                bcrypt.genSalt(function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        self.setDataValue('password_digest', hash);
                    });
                });
            },
            validate: {
                isLongEnough: function (val) {
                    if (val.length < 7) {
                        throw new Error("Please choose a longer password");
                    }

                    if (val.length > 72) {
                        throw new Error("Please choose a shorter password");
                    }
                }
            }
        },
        password_digest: {
            type: DataTypes.STRING
        }
      }, {
        hooks: {
            beforeCreate: function(user, options) {
                if (!user.password) {
                    return sequelize.Promise.reject("Password can't be blank");
                }
            },
            // beforeUpdate: function(user, options) {
            //
            // }
        },
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        },
        instanceMethods: {
            authenticate: function (password) {
                return bcrypt.compareSync(password, this.password_digest);
            }
        }
    });
    return User;
};
