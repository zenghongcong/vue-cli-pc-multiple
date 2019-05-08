let titles = require("./page.title.js");
let glob = require("glob");
let globalConfig = require("./src/config/config");
let CompressionWebpackPlugin = require("compression-webpack-plugin");
let productionGzipExtensions = ["js", "css"];
let pages = {};

glob.sync("./src/views/**/index.js").forEach(path => {
  let chunk = path.split("./src/views/")[1].split("/index.js")[0];
  pages[chunk] = {
    entry: path,
    template: "public/index.html",
    title: titles[chunk],
    filename: chunk.replace("/", "_") + ".html",
    chunks: ["chunk-vendors", "chunk-common", chunk]
  };
});

module.exports = {
  pages,
  publicPath: "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete("named-chunks");
    config.plugin("define").tap(args => {
      args[0]["process.globalConfig"] = JSON.stringify(
        globalConfig[process.env.NODE_ENV]
      );
      return args;
    });
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "test"
    ) {
      // 图片处理
      config.module
        .rule("images")
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use("url-loader")
        .loader("url-loader")
        .options({
          limit: 10000,
          name: "img/[name].[hash:7].[ext]"
        })
        .end()
        .use("image-webpack-loader")
        .loader("image-webpack-loader");
    }
  },
  configureWebpack: config => {
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "test"
    ) {
      // 开启gzip
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      );

      //打包输出配置
      config.output.filename = "js/[name].[hash:8].js";
      config.output.chunkFilename = "js/[name].[hash:8].js";
    }
  }
};
