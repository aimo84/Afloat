const devMode = (process.env.NODE_ENV !== 'development');

export default {
  // App Details
  appName: 'Afloat',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (devMode) ? 'UA-84284256-2' : 'UA-84284256-1',

  // TODO: Need to manually update this each time you run ngrok
  ROOT_URL: 'https://8152b333.ngrok.io',
};
