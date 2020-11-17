var path = require('path'),
    HtmlPlugin = require('html-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin'),
    VueLoaderPlugin = require('vue-loader').VueLoaderPlugin,
    BundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;

module.exports = env => {

    let mode = env ? env.mode : 'development',
        prod = mode == 'production';

    return {
        mode: 'development',
        entry: {
            main: './src/bootstrap/main.ts',
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: prod ? `[name].[hash:8].js` : `[name].js`,
        },
        optimization: {
            minimize: prod,
            minimizer: [new TerserPlugin()]
        },
        resolve: {
            extensions: ['.vue', '.ts', '.tsx', '.js'],
        },
        resolveLoader: {
            modules: ['node_modules', 'loader']
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.tsx$/,
                    use: [
                        'vue-loader', 'vue-tsx-loader?template=jade'
                    ]
                    
                },
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                appendTsSuffixTo: [/\.vue$/],
                            }
                        }
                    ]
                    
                },
                {
                    test: /\.less$/,
                    use: ['style-loader', 'css-loader', 'less-loader']
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, './dist'),
            historyApiFallback: true,
            compress: true,
            port: 3000,
            open:true
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlPlugin({
                inject: true,
                template: './src/index.html',
                filename: './index.html',
            }),
            new BundleSizeAnalyzerPlugin('./report.txt')
        ],
        devtool: prod ? '' : 'source-map',
        mode: mode
    }
};