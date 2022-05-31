const execSync = require('child_process').execSync;
const assert = require('assert');
const path = require('path');
const fs = require('fs');

describe('eslint-plugin-log-files', function() {

    let cwd = path.join(__dirname),
        INVALID_FILE = path.join(__dirname, 'test-files/square-with-alert.js'),
        VALID_FILE = path.join(__dirname, 'test-files/square-without-alert.js'),
        CJS_INVALID_FILE = path.join(__dirname, 'test-files/cjs-with-alert.cjs'),
        CJS_VALID_FILE = path.join(__dirname, 'test-files/cjs-without-alert.cjs'),
        MJS_INVALID_FILE = path.join(__dirname, 'test-files/mjs-with-alert.mjs'),
        MJS_VALID_FILE = path.join(__dirname, 'test-files/mjs-without-alert.mjs'),
        JSM_INVALID_FILE = path.join(__dirname, 'test-files/jsm-with-alert.jsm'),
        JSM_VALID_FILE = path.join(__dirname, 'test-files/jsm-without-alert.jsm'),
        EXPECTED_LOG_PREFIX = 'Linting ',
        nodeModulesHelperFile = path.join(__dirname, '../node_modules/eslint-plugin-log-filenames.js'),
        nodeModulesHelperFileContent = "module.exports = require('../lib/index')";

    function runEslint(argsString) {
        let err, out;
        try {
            out = execSync(path.normalize('../node_modules/.bin/eslint') + ' ' + argsString, {cwd});
        } catch (e) {
            err = e;
        }
        assert(!out);
        out = err && err.stdout.toString();
        assert.equal(typeof out, 'string');
        return out;
    }

    before(function() {
        // since eslint resolves plugins by name only, let's simply generate a
        // temporary js file inside node_modules/ that exports our plugin
        fs.writeFileSync(nodeModulesHelperFile, nodeModulesHelperFileContent);
    });

    after(function() {
        fs.unlinkSync(nodeModulesHelperFile);
    });

    it('if NOT used, should list nothing itself, letting eslint log only files with linting errors', function() {
        let out = runEslint('test-files/');
        assert.equal(typeof out, 'string');
        assert(!out.includes(EXPECTED_LOG_PREFIX));
        assert(!out.includes(VALID_FILE));
        assert(out.includes(INVALID_FILE));
        assert(out.includes('no-alert'));
        assert(out.includes(' potentially fixable with the `--fix` option')); // #4
    });

    it('if used, should list all files linted AND let eslint log files with linting errors additionally', function() {
        let out = runEslint('--plugin log-filenames --ext .js,.cjs,.mjs,.jsm test-files/');

        assert.equal(typeof out, 'string');
        assert(out.includes(EXPECTED_LOG_PREFIX + VALID_FILE));
        assert(out.includes(EXPECTED_LOG_PREFIX + INVALID_FILE));

        assert(out.includes(EXPECTED_LOG_PREFIX + CJS_VALID_FILE));
        assert(out.includes(EXPECTED_LOG_PREFIX + CJS_INVALID_FILE));
        assert(out.includes(EXPECTED_LOG_PREFIX + MJS_VALID_FILE));
        assert(out.includes(EXPECTED_LOG_PREFIX + MJS_INVALID_FILE));
        assert(out.includes(EXPECTED_LOG_PREFIX + JSM_VALID_FILE));
        assert(out.includes(EXPECTED_LOG_PREFIX + JSM_INVALID_FILE));

        assert(out.includes('no-alert'));
        assert(out.includes(' potentially fixable with the `--fix` option')); // #4
    });

    it('should NOT log linted files if eslint is run with --format=checkstyle CLI option', function() {
        let out = runEslint('--plugin log-filenames --format=checkstyle test-files/');

        assert(!out.includes(EXPECTED_LOG_PREFIX));
        assert(out.includes('<?xml'));
        assert(out.includes(VALID_FILE));
        assert(out.includes(INVALID_FILE));
        assert(out.includes('no-alert'));
    });
});
