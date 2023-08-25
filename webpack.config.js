// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin, webpack } = require("webpack");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const express = require("express");
const Dotenv = require("dotenv-webpack");
//const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isProduction =
  process.env.SERVER == "production" || process.env.SERVER == "test";

const stylesHandler = MiniCssExtractPlugin.loader;

const switchEnvFile = mode => {
  if (mode == "test") {
    return "env-prod-test.env";
  } else if (mode == "production") {
    return "env-prod.env";
  }
  return "env-dev.env";
};

const config = {
  entry: "./src/index.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "../monitor-server-capture/dist"),
    filename: pathData => {
      if (isProduction) {
        return pathData.chunk.name === "main"
          ? "[name].[contenthash].bundle.js"
          : "[name]/[name].[contenthash].bundle.js";
      } else {
        return pathData.chunk.name === "main"
          ? "[name].bundle.js"
          : "[name]/[name].bundle.js";
      }
    }
  },
  devServer: {
    host: "localhost",
    port: 8008,
    historyApiFallback: true,
    setupMiddlewares: function (middlewares, devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      // let corsOptions = {
      //   origin: ["http://localhost:3002", "http://localhost:3003"]
      // };

      // devServer.app.use(cors(corsOptions));

      // devServer.app.use(cookieSessionConfig());

      // middlewares.unshift(sessionMiddleware);

      // routerApi(devServer.app);
      devServer.app.use(
        "/locales",
        express.static(path.resolve(__dirname, "./src/languages/locales"))
      );

      return middlewares;
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "./src/assets/images/logo-monitor.svg",
      inject: "body",
      hash: true,
      prefetch: {
        chunks: ["vendor"]
      }
    }),

    new MiniCssExtractPlugin(),
    new Dotenv({
      systemvars: true,
      path: path.resolve(__dirname, switchEnvFile(process.env.SERVER))
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  devtool: isProduction ? "source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      },

      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"]
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};

module.exports = () => {
  let devPlugins = [];
  if (isProduction) {
    config.mode = "production";
    devPlugins = [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/languages/locales"),
            to: path.resolve(
              __dirname,
              "../monitor-server-capture/dist/locales"
            )
          }
        ]
      })
    ];
  } else {
    config.mode = "development";
    devPlugins = [
      new HotModuleReplacementPlugin(),
      new ReactRefreshPlugin()
      //new BundleAnalyzerPlugin(),
    ];
  }

  devPlugins.forEach(plugin => config.plugins.push(plugin));

  return config;
};
