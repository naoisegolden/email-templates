var path = require('path');
var EmailTemplate = require('email-templates').EmailTemplate;
var pug = require('pug');
var locals = require('./data.json');

var templateDir = path.resolve(__dirname, 'templates', 'example-email');
var template = new EmailTemplate(templateDir);

template
  .render(locals)
  .then(function (results) {
    console.log(results)
  });
