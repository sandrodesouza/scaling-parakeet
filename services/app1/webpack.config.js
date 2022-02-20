const path = require('path')
const AwsSamPlugin = require('aws-sam-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const awsSamPlugin = new AwsSamPlugin()

module.exports = {
  // Loads the entry object from the AWS::Serverless::Function resources in your
  // SAM config. Setting this to a function will
  entry: () => awsSamPlugin.entry(),

  // Write the output to the .aws-sam/build folder
  output: {
    filename: (chunkData) => awsSamPlugin.filename(chunkData),
    libraryTarget: 'commonjs2',
    path: path.resolve('.'),
  },

  devtool: 'source-map',

  // Resolve .ts and .js extensions
  resolve: {
    extensions: ['.ts', '.js'],
  },

  target: 'node',

  // AWS recommends always including the aws-sdk in your Lambda package
  // but excluding can significantly reduce the size of your deployment package.
  externals: process.env.NODE_ENV === 'development' ? [] : ['aws-sdk'],

  // Set the webpack mode
  mode: process.env.NODE_ENV || 'production',

  // Add the esbuild loader
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          minify: true,
          target: 'es2015',
          sourcemap: 'inline',
        },
      },
    ],
  },

  // Add the AWS SAM Webpack plugin
  plugins: [awsSamPlugin],

  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  },
}
