# Email Templates Toolbox
Build email templates with SASS and PUG.

## How to use
1. Create a new folder in `./templates` for your tempalte
2. Make sure to include:
  - html.{{ext}} (required) - for html format of email
  - text.{{ext}} (optional) - for text format of email
  - style.{{ext}} (optional) - styles for html format
  - subject.{{ext}} (optional) - for subject of email
3. Modify `index.js` to point `templateDir` to your directory.

You can use any templating language that conforms to [consolidate.js](https://www.npmjs.com/package/consolidate) for the html template and CSS or SCSS for styles.

The template example uses [pug.js](https://pugjs.org) and [SASS](https://sass-lang.com).

## Run
```
$ npm install
$ node index.js
```

Generates a file `index.html` in folder `build`.
