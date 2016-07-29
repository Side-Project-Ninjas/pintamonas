/**
 * Utils module
 */
"use strict";
var crypto = require('crypto');

function getRandomInt(min, max) {
    min = min || 0;
    max = max || 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

function parseCookie(string) {
    //"io=7zi3SBvA9Lq88y6wAAAA; connect.sid=s%3A3Fd0KJoCD7J_5TX_zfoURrbuadwzhLaB.mnInEDezv9z%2FQMs40Mvlz8UAgCvJbcYVyUVYP%2FSYlRU"
    var arr = string.split('; ');
    var cookies = {};
    arr.forEach(function(el) {
        var a = el.split('=');
        cookies[a[0]] = a[1];
    });
    return cookies;
}

// Export utils
// ============
module.exports = {
    getRandomInt: getRandomInt,
    md5: md5,
    parseCookie: parseCookie
};
