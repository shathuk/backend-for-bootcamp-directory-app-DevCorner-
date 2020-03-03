var NodeGeocoder = require('node-geocoder');
 
const options = {
  provider: 'mapquest',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: '77nA41VjGz8J8uj5qOKBhRHwAjingh0r', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
const geocoder = NodeGeocoder(options);

module.exports = geocoder;