const babelConfig = {
    // presets: ["@babel/preset-react", "@babel/preset-env"],
    // plugins: ["@babel/plugin-syntax-dynamic-import"]
    presets: [
        ["@babel/preset-env", {
            useBuiltIns: "entry",
            corejs: 2
        }], "@babel/preset-react"
    ],
    plugins: ["@babel/plugin-syntax-dynamic-import", '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']

}
module.exports = babelConfig;