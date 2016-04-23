/**
 * Main access
 */
// Global modifiers
// ================

require('better-strings');
require('colors');
console = require('better-console');
require("console-stamp")(console, {
  pattern: "HH:MM:ss",
  metadata: '[' + process.pid + ']',
  colors: {
    stamp: "yellow",
    label: "cyan",
    metadata: "gray"
  }
});


// Export the application
// ======================
exports = module.exports = require('./app');
