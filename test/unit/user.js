// move this to the config
require('../../models');

var expect = require('chai').expect,
    bcrypt = require('bcrypt'),
    _ = require('lodash'); // jshint ignore:line

describe('User', function() {
    before(function(next) {
        // move this to the very beginning of unit tests
        sequelize.sync({force: true}).then(() => { next(); });
    });

    it('shouldnt create a User without password', () => {
        User.create({ email: 'izelnakri@hotmail.com' }).catch((error) => {
            expect(error.message).to.equal("notNull Violation: password_digest cannot be null");
        });
    });

    it('should create a User with password', () => {
        User.create({
            email: 'izelnakri@hotmail.com',
            password: '1234567'
        }).then((user) => {
            expect(user.id).to.equal(1);
            expect(user.authenticate('1234567')).to.equal(true);
        });
    });

    it('shouldnt update the User when the password change is null', () => {
        User.findById(1).then((user) => {
            user.update({ password: null }).then((user) => {
                expect(user.authenticate('1234567')).to.equal(true);
                expect(user.email).to.equal('izelnakri@hotmail.com');
            });
        });
    });

    it('shouldnt update the User when the password change is null but updates other attributes', () => {
        User.findById(1).then((user) => {
            user.update({ email: 'a@hotmail.com', password: null }).then((user) => {
                expect(user.authenticate('1234567')).to.equal(true);
                expect(user.email).to.equal('a@hotmail.com');
            });
        });
    });

    it('shouldnt update the User when the password changes', () => {
        User.findById(1).then((user) => {
            user.update({ password:'newpassword' }).then((user) => {
                expect(user.authenticate('newpassword')).to.equal(true);
                expect(user.password).to.equal('newpassword');
            });
        });
    });

    it('should generate a authentication_token', () => {
        User.findById(1).then((user) => {
            expect(user.authentication_token).to.equal(null);
            // make this test pass
            user.generateAuthenticationToken().save().then((user) => {
                // expect(user.authentication_token.length).to.equal(64);
            });
        });
    });

    // password change should expect the password_reset_token



    // generatePasswordResetToken
    // generateAuthenticationToken
});
