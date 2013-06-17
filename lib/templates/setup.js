
var Handlebars = require('handlebars-runtime')
  // HELPERS
  , upcase = require('./helpers/upcase')
  // PARTIALS
  , link   = require('./partials/link.hbs')

module.exports = function() {

  // HELPERS
  Handlebars.registerHelper('upcase', upcase)

  // PARTIALS
  Handlebars.registerPartial('link', link);

}
