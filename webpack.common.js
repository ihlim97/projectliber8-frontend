const path =                    require("path")
const fs =                      require("fs")
const HtmlWebpackPlugin =       require("html-webpack-plugin")
const MiniCssExtractPlugin =    require("mini-css-extract-plugin")
const CssUrlRelativePlugin =    require("css-url-relative-plugin")
const webpack =                 require("webpack");
const SVGSpritemapPlugin =      require("svg-spritemap-webpack-plugin");


const pages = fs.readdirSync(path.resolve(__dirname, "src"))
                .filter(fileName => fileName.endsWith(".twig"))


module.exports = {
    entry: "./src/js/index.js",
    resolve: {
        extensions: [".js", ".scss", ".css"],
        alias: {
            assets: path.resolve(__dirname, 'src/assets')
        }
    },
    module: {
        rules: [
            // {
            //     // handle the HTML files
            //     test: /.html$/,
            //     use: ["html-loader"]
            // },
            {
                test: /\.twig$/,
                use: [
                    'html-loader',
                    'twig-html-loader'
                ]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                exclude: /fonts/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "img"
                    }
                }
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                exclude: [/img/, /img\/icons/],
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts"
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

                    // apply postcss transforms like autoprefixer and minify
                    { loader: "postcss-loader" },

                    "resolve-url-loader",
                    
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
        ...pages.map(page => new HtmlWebpackPlugin({
            template: "src/" + page,
            filename: page.replace(".twig", ".html"),
            inject: true
        })),
        new SVGSpritemapPlugin("src/assets/img/icons/**/*.svg", {
            output: {
                filename: "img/icons/icons.svg",
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/bundle.css"
        }),
        new CssUrlRelativePlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            "window.jQuery": "jquery",
            Popper: ['popper.js', 'default'],
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        })
    ]
}