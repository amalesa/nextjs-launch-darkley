require('dotenv').config()

var LaunchDarkly = require('launchdarkly-node-server-sdk');

var ldclient = LaunchDarkly.init(process.env.LAUNCH_DARKLEY);
var user = {
  firstName: 'Unknown',
  lastName: 'Unknown',
  key: 'UNIQUE IDENTIFIER',
  custom: {
    groups: 'beta_testers'
  }
};

const getLdClient = () => ldclient.once('ready', () => {
    ldclient.variation('flag-test', user, false, function(err, showFeature) {
      if (showFeature) {
        console.log('Showing your feature to ' + showFeature);
      } else {
        console.log('Not showing your feature to ' + showFeature);
      }
      ldclient.flush(function() {
        ldclient.close();
      });
    });
  });

  module.exports = { getLdClient, user }

  

