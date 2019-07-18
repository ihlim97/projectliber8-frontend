const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssUrlRelativePlugin = require("css-url-relative-plugin")

module.exports = {
    entry: "./src/js/index.js",
    resolve: {
        extensions: [".js", ".scss", ".css"]
    },
    module: {
        rules: [
            {
                // handle the HTML files
                test: /.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                exclude: /fonts/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "assets/img"
                    }
                }
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                exclude: /img/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "assets/fonts"
                    }
                }
            },
            {
                test: [/.js$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /.(sa|sc|c)ss$/,
                use: [
                    // Transform css and extract into separate single bundle
                    // Required to generate the file
                    { loader: MiniCssExtractPlugin.loader },

                    // Handles url() and @imports
                    { 
                        loader: "css-loader",
                        // options: { url: false }
                    },

                    // { loader: "resolve-url-loader" },

                    // apply postcss transforms like autoprefixer and minify
                    { loader: "postcss-loader" },

                    // transform SASS to CSS
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "ProjectLiber8",
            template: "./src/index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/bundle.css"
        }),
        new CssUrlRelativePlugin()
    ]
}