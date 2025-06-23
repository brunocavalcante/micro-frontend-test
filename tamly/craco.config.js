const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Set publicPath for proper asset loading
      webpackConfig.output.publicPath = 'auto';
      
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'tamly',
          filename: 'remoteEntry.js',
          exposes: {
            './App': './src/App',
          },
          shared: {
            react: { 
              singleton: true, 
              eager: true,
              requiredVersion: false
            },
            'react-dom': { 
              singleton: true, 
              eager: true,
              requiredVersion: false
            },
            'react-router-dom': { 
              singleton: true, 
              eager: true,
              requiredVersion: false
            },
          },
        })
      );
      
      webpackConfig.mode = 'development';
      webpackConfig.target = 'web';
      
      return webpackConfig;
    },
  },
  devServer: {
    port: 3002,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    historyApiFallback: true,
  },
}; 