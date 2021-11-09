/*global module, require*/
/*eslint no-undef: "error"*/
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  images:{
    domains: ['via.placeholder.com'],
    formats: ['image/avif', 'image/webp']
  }
})