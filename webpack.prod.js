const path = require("path")
const common = require("./webpack.common")
const merge = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // only need in prod cuz dev is using in-memory server

module.exports = merge(common, {
    mode: "production",
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: 'js/[name].[contentHash].js'
    },
    plugins: [new CleanWebpackPlugin()]
})