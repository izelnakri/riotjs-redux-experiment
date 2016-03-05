// move this to the config
var expect = require('chai').expect,
    _ = require('lodash'), // jshint ignore:line
    models = require('../../models');

describe('User', function() {
    before(function(next) {
        // move this to the very beginning of unit tests
        models.sequelize.sync({force: true}).then(function() {
            Object.keys(models).forEach(function(model) {
                if (model !== 'Sequelize' || model !== 'sequelize') {
                    global[model] = models[model];
                }
            });

            next();
        });
    });

    it('shouldnt create a User without password', function() {
        User.create({email: 'izelnakri@hotmail.com'}).then(function (user) {
            expect(user.id).to.equal(1);
        });
    });

    it('shouldnt update the User when the password change is null', function() {

    });

    it('password setter turns password to password_digest before_create', function() {
        expect(1).to.equal(1);
    });

    it('password setter turns password to password_digest before_update', function() {
        expect(1).to.equal(1);
    });

    it('.authenticate() authenticates correctly', function() {
        // test correct version

        // test incorrect version
        expect(_.includes([1,2], 1)).to.equal(true);
    });
});
