// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackProvidePlugin = require('webpack').ProvidePlugin;
const WebpackDefinePlugin = require('webpack').DefinePlugin;
require('dotenv').config();
require('dotenv').config({path:'.env.local'});




/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    entry: {
        main: './src/main.tsx', // Adjust this to your main TypeScript file
    },
    devtool: 'source-map',
    output: {
        filename: '[name]-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Clean the output directory before each build
        publicPath: '/wordpress/wp-content/plugins/ielts_checkmate_dashboard/dist/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'], // Added .scss for SCSS files
        alias:{
            "@":path.resolve(__dirname,"src")
        }
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/, // Added rule for .scss files
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader', // Compiles Sass to CSS
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // Rule for images
                type: 'asset/resource', // Use asset module for images,
                generator: {
                    filename: 'assets/images/[name][ext]', // Output path for images
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i, // Rule for fonts
                type: 'asset/resource', // Use asset module for fonts
                generator: {
                    filename: 'assets/fonts/[name][ext]', // Output path for fonts
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Adjust this to your HTML template
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css', // Output filename for extracted CSS
            // chunkFilename: '[id].css',
        }),
        new WebpackProvidePlugin({
            React: 'react',
        }),
        new WebpackDefinePlugin({
            "process.env":JSON.stringify(process.env)
        }),
    ],
    devtool: 'source-map',
    mode: 'development', // Change to 'production' for production builds
    optimization: {
        splitChunks: {
            //   chunks: 'all', // Split both synchronous and asynchronous chunks
            // maxSize: 250000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/, // Include all node_modules
                    name: 'vendors', // Name of the chunk
                    //   chunks: 'all',
                },
            },
        },
        // runtimeChunk: 'single', // Create a separate chunk for the runtime
    },
};