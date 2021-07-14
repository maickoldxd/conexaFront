/*global module, require*/
/*eslint no-undef: "error"*/
const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        dest: 'public'
      }
})