require('dotenv').config()

var LaunchDarkly = require('launchdarkly-node-server-sdk');

var ldclient = LaunchDarkly.init(process.env.LAUNCH_DARKLEY);
var user = {
  firstName: 'Aleksandra',
  lastName: 'Malesa',
  key: 'UNIQUE IDENTIFIER',
  email: 'a_malesa@hotmail.co.uk',
  custom: {
    groups: 'beta_testers'
  },
  country:'Sweden'
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

  

