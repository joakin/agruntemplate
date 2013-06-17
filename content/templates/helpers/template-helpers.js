
var helpers = {};

helpers.comment = function(input) {
  return '<!-- ' + input + ' -->'
}

helpers.layout = function(layout, options) {
  console.log('layout', layout)
  console.log(this)
  return options.fn(this)
}

module.exports = exports = helpers;
