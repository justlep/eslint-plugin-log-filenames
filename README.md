# eslint-plugin-log-filenames [![Build Status](https://travis-ci.com/justlep/eslint-plugin-log-filenames.svg?branch=master)](https://app.travis-ci.com/github/justlep/eslint-plugin-log-filenames) [![NPM Version][npm-image]][npm-url]
ESLint plugin for logging the paths of all linted files to the console

## Why?
ESLint doesn't provide a summary of which or how many files have been linted. 
Thus, misconfiguration can easily lead to a falsely "clean" linting results just because not all intended files got checked.

By adding this plugin to an ESLint config, a list of all linted files will be output, regardless of actual linting errors.

## How?
Add the plugin to your project
```shell
$ npm install --save eslint-plugin-log-filenames
```

Then include it in your ESLint configuration (e.g .eslintrc)
```javascript
{
  "plugins": [
    "log-filenames"
  ],
  ...
}
```
or via CLI 
```shell
eslint --plugin log-filenames
```

Logged file types are `*.{js,jsx,es,es6,cjs,mjs,jsm,ts,tsx,html}`.  
If you need more exotic extensions, simply add an `overrides` section to your `.eslintrc`, 
making the plugin log every file regardless of its extension:

```javascript
{
  "plugins": [
    "log-filenames"
  ],
  "overrides": [
    {
      "files": "*.*",
      "processor": "log-filenames/.js"
    }
  ],
  ...
}
```


### Important
If ESLint is run with the `--format=checkstyle` CLI option (as IntelliJ's ESLint integration does), logging filenames is skipped in order to not produce invalid checkstyle XML in the console.


[npm-image]: https://img.shields.io/npm/v/eslint-plugin-log-filenames.svg
[npm-url]: https://npmjs.org/package/eslint-plugin-log-filenames
