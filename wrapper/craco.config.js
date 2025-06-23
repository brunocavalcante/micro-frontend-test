const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// Environment-based remote URLs
const remoteConfig = {
  development: {
    orchestrator: 'http://localhost:3001',
    tamly: 'http://localhost:3002'
  },
  production: {
    orchestrator: process.env.REACT_APP_ORCHESTRATOR_URL || 'https://your-orchestrator-app.vercel.app',
    tamly: process.env.REACT_APP_TAMLY_URL || 'https://your-tamly-app.vercel.app'
  }
};

const environment = process.env.NODE_ENV || 'development';
const remoteUrls = remoteConfig[environment];

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Set publicPath for proper asset loading
      webpackConfig.output.publicPath = 'auto';
      
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'wrapper',
          remotes: {
            orchestrator: `orchestrator@${remoteUrls.orchestrator}/remoteEntry.js`,
            tamly: `tamly@${remoteUrls.tamly}/remoteEntry.js`,
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
      
      // Ensure proper resolve configuration
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
      };
      
      return webpackConfig;
    },
  },
  devServer: {
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    historyApiFallback: true,
  },
}; 