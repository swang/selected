'use strict';

var isArray = Array.isArray || function(arr) {
  return Object.prototype.toString.call(arr).slice(8, -1) === 'Array';
}

var isString = function(arr) {
  return Object.prototype.toString.call(arr).slice(8, -1) === 'String';
}

module.exports.isArray = isArray;
module.exports.isString = isString;
