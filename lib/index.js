var EXTENSIONS = [
        '.js',
        '.jsx',
        '.es',
        '.es6',
        '.ts',
        '.html'
    ],
    LOGGING_PROCESSOR = {
        preprocess: function(text, filename) {
            console.log('Linting ' + filename);
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