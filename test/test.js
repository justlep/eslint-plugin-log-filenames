var execSync = require('child_process').execSync,
    assert = require('assert'),
    path = require('path'),
    fs = require('fs');

describe('eslint-plugin-log-files', function() {

    var CWD = path.join(__dirname),
        INVALID_FILE = path.join(__dirname, 'test-files/square-with-alert.js'),
        VALID_FILE = path.join(__dirname, 'test-files/square-without-alert.js'),
        EXPECTED_LOG_PREFIX = 'Linting ',
        cmd = path.normalize('../node_modules/.bin/eslint') + ' test-files/',
        nodeModulesHelperFile = path.join(__dirname, '../node_modules/eslint-plugin-log-filenames.js'),
        nodeModulesHelperFileContent = "module.exports = require('../lib/index')";

    before(function() {
        // since eslint resolves plugins by name only, let's simply generate a
        // temporary js file inside node_modules/ that exports our plugin
        fs.writeFileSync(nodeModulesHelperFile, nodeModulesHelperFileContent);
    });

    after(function() {
        fs.unlinkSync(nodeModulesHelperFile);
    });

    it('if NOT used, should list nothing itself, letting eslint log only files with linting errors', function() {
        var err, out;
        try {
            out = execSync(cmd , {cwd: CWD});
        } catch (e) {
            err = e;
        }

        assert(!out);
        out = err && err.stdout.toString();
        assert.equal(typeof out, 'string');
        assert(!out.includes(EXPECTED_LOG_PREFIX));
        assert(!out.includes(VALID_FILE));
        assert(out.includes(INVALID_FILE));
        assert(out.includes('no-alert'));
    });

    it('if used, should list all files linted AND let eslint log files with linting errors additionally', function() {
        var err, out;
        try {
            out = execSync(cmd + ' --plugin log-filenames', {cwd: CWD});
        } catch (e) {
            err = e;
        }

        assert(!out);
        out = err && err.stdout.toString();
        assert.equal(typeof out, 'string');
        assert(out.includes(EXPECTED_LOG_PREFIX + VALID_FILE));
        assert(out.includes(EXPECTED_LOG_PREFIX + INVALID_FILE));
        assert(out.includes('no-alert'));
    });

});