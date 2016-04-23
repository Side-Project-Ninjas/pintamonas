/**
 * Utils module
 */
'use strict';

function getRandomInt(min, max) {
    min = min || 0;
  max = max || 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Export utils
// ============
module.exports = {
  getRandomInt: getRandomInt
};