var path = require('path');
var fs = require('fs');
var EmailTemplate = require('email-templates').EmailTemplate;
var pug = require('pug');
var locals = require('./data.json');
var bs = require("browser-sync").create();

var templateDir = path.resolve(__dirname, 'templates', 'example-email');
var renderDir = path.resolve(__dirname, 'build');

/* Writes `content` in `dir`/`filename`.
 * Returns a promise which is resolved when the
 * file is finished writing.
 */
var writeFile = function(dir, filename, content) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  var file = path.resolve(dir, filename);

  return new Promise(function(resolve, reject) {
    fs.writeFile(file, content, function(err) {
      if (err) reject(err);
      else resolve();
    });
  });
}

/* Renders template with local variables in `locals` file
 * and it saves the output to `build/index.html`.
 * Returns a promise that resolves when file is written.
 */
var renderTemplate = function(templateDir, locals) {
  // FIXME: https://github.com/crocodilejs/node-email-templates/issues/208
  var template = new EmailTemplate(templateDir);

  return template.render(locals)
    .then(function(result) {
      return writeFile(renderDir, 'index.html', result.html);
    });
}

/* Watches for changes in template and re-renders it.
 */
fs.watch(templateDir, function(event, filename) {
  renderTemplate(templateDir, locals)
    .then(function() {
      bs.reload();
    });
});

/* Triggers the rendering of the template and opens it
 * in http://localhost:3001/, reloads automatically when
 * the template changes.
 */
renderTemplate(templateDir, locals)
  .then(function() {
    bs.init({
      server: renderDir
    });
  });
