# eslint-plugin-log-filenames [![Build Status](https://travis-ci.org/justlep/eslint-plugin-log-filenames.svg?branch=master)](https://travis-ci.org/justlep/eslint-plugin-log-filenames)
ESLint plugin for logging the paths of all files being linted to the console

## Why?
ESLint in its current version (4.18.2) won't log a summary of which or how many files were actually being linted. 
Therefore misconfiguration can  easily lead to a falsely "clean" linting result because not all intended files got actually checked. 
By including this plugin in an ESLint configuration, a full list of the files being linted will be output, regardless of (and additionally to)  actual linting errors.

Currently logged file types: see lib/index.js

## How?
Add the plugin to your project
```
npm install --save eslint-plugin-log-filenames
```

Then include it in your ESLint configuration (e.g .eslintrc)
```
{
  "plugins": [
    "log-filenames"
  ],
  ...
}
```
or via CLI 
```
eslint --plugin log-filenames
```

