const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            src: path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: require.resolve('babel-loader'),
                options: {
                    presets: [
                        require.resolve('@babel/preset-env'),
                        [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
                    ],
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
};
