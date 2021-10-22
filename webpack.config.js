const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinPlugin = require("imagemin-webpack-plugin").default;

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

const cssLoaders = (extra) => {
  const loaders = [MiniCssExtractPlugin.loader, "css-loader"];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const jsLoaders = () => {
  const loader = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  ];

  if (isDev) {
    loader.push("eslint-loader");
  }
  return loader;
};
let htmlPageNames = ["forms", "products"];

let multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `./${name}.html`,
    filename: `${name}.html`,
    chunks: [`${name}`],
  });
});

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    index: ["@babel/polyfill", "./index.js"],
    forms: "./scripts/forms.js",
    products: "./scripts/products.js",
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    static: "./dist",
  },
  output: {
    filename: "./scripts/[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "[path][name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "[path][name][ext]",
        },
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.handlebars$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      chunks: ["index"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/beetroot.png"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "src/img"),
          to: path.resolve(__dirname, "dist/img"),
        },
      ],
    }),
    new ImageMinPlugin({
      disable: process.env.NODE_ENV !== "production",
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: { quality: 80 },
    }),
    new MiniCssExtractPlugin({
      filename: "./styles/[name].[hash].css",
    }),
  ].concat(multipleHtmlPlugins),
};
