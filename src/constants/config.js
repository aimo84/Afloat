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
  ROOT_URL: 'http://6bc60f39.ngrok.io',
=======
  ROOT_URL: 'https://48cfdf64.ngrok.io',
>>>>>>> 5d01b47ec133f775b1b4bbce130b5b8a2aa0bb11
};
