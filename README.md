# eslint-plugin-log-filenames [![Build Status](https://travis-ci.org/justlep/eslint-plugin-log-filenames.svg?branch=master)](https://travis-ci.org/justlep/eslint-plugin-log-filenames)
ESLint plugin for logging the paths of all linted files to the console

## Why?
ESLint in its current version (4.18.2) doesn't provide a summary of which or how many files have actually been linted. 
Thus, misconfiguration can easily lead to a falsely "clean" linting results because not all intended files got actually checked. 
By including this plugin in an ESLint configuration, a full list of the files being linted will be output, regardless of (and additionally to) actual linting errors.

Currently logged file types: see [lib/index.js](./lib/index.js)

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

### Important
If ESLint is run with the `--format=checkstyle` CLI option (as IntelliJ's ESLint integration does), logging filenames is skipped in order to not produce invalid checkstyle XML in the console.
