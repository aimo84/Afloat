const devMode = (process.env.NODE_ENV !== 'development');

export default {
  // App Details
  appName: 'Quantweb',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (devMode) ? 'UA-84284256-2' : 'UA-84284256-1',

  // TODO: Need to manually update this each time you run ngrok
<<<<<<< HEAD
  ROOT_URL: 'https://d2cb6cbf.ngrok.io',
=======
  ROOT_URL: 'https://f70e9392.ngrok.io',
>>>>>>> d759d6d5adcf6de8292dabe1e251691bd6587e8a
};
