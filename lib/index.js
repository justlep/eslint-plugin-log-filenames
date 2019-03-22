var base = process.cwd();

var count = 0,
    EXTENSIONS = [
        '.js',
        '.jsx',
        '.es',
        '.es6',
        '.ts',
        '.html'
    ],
    IS_LOGGING_ALLOWED = process.argv.indexOf('--format=checkstyle') < 0,
    LOGGING_PROCESSOR = {
        preprocess: function(text, filename) {
            if (IS_LOGGING_ALLOWED) {
                console.log(++count + '. Linting ' + filename.replace(base, ''));
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