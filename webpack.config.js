const path = require('path');

module.exports = [
  // Configuration for the main entry point (UMD library)
  {
    mode: 'production',
    entry: {
      main: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, './lib'),
      filename: 'index.js',
      library: {
        name: '@jcendal/nx-angular-generators-derived',
        type: 'umd',
      },
      umdNamedDefine: true,
    },
    target: 'node',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
      ],
    },
  },
  // Note: The CLI is compiled directly with TypeScript in the build:cli script
  // to ensure it uses CommonJS instead of ES modules
];
