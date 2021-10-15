var count = 0,
    EXTENSIONS = [
        '.js',
        '.jsx',
        '.es',
        '.es6',
        '.cjs',
        '.mjs',
        '.jsm',
        '.ts',
        '.html'
    ],
    IS_LOGGING_ALLOWED = process.argv.indexOf('--format=checkstyle') < 0,
    LOGGING_PROCESSOR = {
        preprocess: function(text, filename) {
            if (IS_LOGGING_ALLOWED) {
                console.log(++count + '. Linting ' + filename);
            }
            return [text];
        },
        postprocess: function(messages, filename) {
            return messages[0];
        }
    };

module.exports = {
    processors: EXTENSIONS.reduce(function(ext2processor, ext) {
        ext2processor[ext] = LOGGING_PROCESSOR;
        return ext2processor;
    }, {})
};
