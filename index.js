var path = require('path');
var fs = require('fs');
var EmailTemplate = require('email-templates').EmailTemplate;
var pug = require('pug');
var locals = require('./data.json');

var templateDir = path.resolve(__dirname, 'templates', 'example-email');
var renderDir = path.resolve(__dirname, 'build');
var template = new EmailTemplate(templateDir);

/* Writes `content` in `dir`/`filename`.
 * Returns a promise which is resolved when the
 * file is finished writing.
 */
var writeFile = function(dir, filename, content) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  var file = path.resolve(dir, filename);
  console.log(file);

  return new Promise(function(resolve, reject) {
    fs.writeFile(file, content, function(err) {
      if (err) reject(err);
      else resolve();
    });
  });
}

/* Renders EmailTemplate `template` with local variables in `locals`.
 * Returns a promise with an object containing `{ html, text, subject }`.
 */
var renderTemplate = function(template, locals) {
  return template.render(locals);
}

renderTemplate(template, locals)
  .then(function(result) {
    return writeFile(renderDir, 'index.html', result.html);
  })
  .then(function() {
    // blank on purpose
  });
