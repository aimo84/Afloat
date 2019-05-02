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
  ROOT_URL: 'https://50ee8e4c.ngrok.io',
=======
  ROOT_URL: 'http://5f5db8b3.ngrok.io',
>>>>>>> 9f963a67d9dc2ff3f4547d9cacf4e6f50d3159df
};
