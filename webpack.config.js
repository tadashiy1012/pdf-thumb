const path = require('path');

module.exports = (env, argv) => {
    argv = argv === void 0 ? {} : argv;
    const IS_DEV = argv.mode === 'development' || argv.mode === void 0;
    return {
        entry: {
            'main': './src/main.js',
            'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
        },
        output: {
            path: path.resolve(__dirname, 'public/js'),
            publicPath: 'js/',
            filename: '[name].bundle.js'
        },
        module: {
            rules: []
        },
        plugins: [],
        resolve: {
            alias: {}
        },
        devtool: IS_DEV ? 'source-map' : 'none',
        optimization: {
            minimize: IS_DEV ? false : true,
        }
    };
};