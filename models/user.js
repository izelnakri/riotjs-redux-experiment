'use strict';
var crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    base64url = require('base64url'),
    _ = require('lodash');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.VIRTUAL,
            set: (password) => {
                var self = this;

                self.setDataValue('password', password);
                bcrypt.genSalt((err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        self.setDataValue('password_digest', hash);
                    });
                });
            },
            validate: {
                isLongEnough: (val) => {
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
        },
        password_reset_token: DataTypes.STRING,
        authentication_token: DataTypes.STRING,
        confirmed: DataTypes.BOOLEAN,
        is_admin: DataTypes.BOOLEAN,
        first_name: {
            type: DataTypes.STRING,
            validate: { min: 2 } // could be problematic
        },
        last_name: {
            type: DataTypes.STRING,
            validate: { min: 2 } // could be problematic
        },
        full_name: { // UNIT TEST THIS ATTRIBUTE + INTERACTION
            type: DataTypes.VIRTUAL,
            get: () => {
                if (this.first_name) {
                    if (this.last_name) {
                        return this.first_name + ' ' + this.last_name;
                    }
                    return this.first_name;
                }
            },
            set: (full_name) => {
                if (_.isString(full_name) && full_name.length > 1) {
                    var names = full_name.trim().split(' ');

                    this.setDataValue('first_name', names.splice(0, 1));
                    if (names[0]) {
                        this.setDataValue('last_name', names.join(' '));
                    }
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            set: () => {
                // complicated App-slug uniqueness lookup here
            }
        },
        ip: DataTypes.STRING,
        used_ios_app: DataTypes.BOOLEAN,
        used_android_app: DataTypes.BOOLEAN
      }, {
        hooks: {
            beforeCreate: (user, options) => {
                if (!user.password) {
                    return sequelize.Promise.reject("Password can't be blank");
                }
            },
            // beforeUpdate: function(user, options) {
            //
            // }
        },
        classMethods: {
            associate: (models) => {
                // associations can be defined here
            }
        },
        instanceMethods: {
            authenticate: (password) => {
                return bcrypt.compareSync(password, this.password_digest);
            },
            generatePasswordResetToken: () => {
                 this.password_reset_token = base64url(crypto.randomBytes(48));
            },
            generateAuthenticationToken: () => {
                this.authentication_token = crypto.randomBytes(64);
            }
        }
    });
    return User;
};
