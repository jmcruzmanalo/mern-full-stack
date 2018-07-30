const env = process.env.NODE_ENV || 'development';

const cfg = {};

if (env === 'development' || env === 'test') {
  const config = require('./config.dev')[env];
  Object.keys(config).forEach((key) => {
    process.env[key] = config[key];
    cfg[key] = config[key];
  });
} else {
  const config = require('./config.dev')[env];
  Object.keys(config).forEach((key) => {
    process.env[key] = config[key];
    cfg[key] = config[key];
  });
}

module.exports = { ...cfg };