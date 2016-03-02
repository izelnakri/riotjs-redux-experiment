// require('mocha-generators').install();
// var Nightmare = require('nightmare'),
//     expect = require('chai').expect, // jshint ignore:line
//     nightmare = Nightmare(); // jshint ignore:line
//
// describe('test yahoo search results', function() {
//     it('should find the nightmare github link first', function*() {
//         var link = yield nightmare
//           .goto('http://yahoo.com')
//           .type('input[title="Search"]', 'github nightmare')
//           .click('#uh-search-button')
//           .wait('#main')
//           .evaluate(function () {
//             return document.querySelector('#main .searchCenterMiddle li a').href;
//         });
//
//         expect(link).to.equal('https://github.com/segmentio/nightmare');
//   });
// });
