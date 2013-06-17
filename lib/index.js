
require('./vendor/lib')()
require('./common/common')()

require('./templates/setup.js')()

require('./other')()
require('./another.coffee')()
require('./otheranother.ls')()

console.log(require('./templates/test.hbs')({
  url: 'google.com',
  text: 'Google'
}))

console.log('Loading index')

