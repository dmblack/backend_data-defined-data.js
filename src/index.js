
const moment = require('moment');
const sizeof = require('object-sizeof');

const stateable = require('./behaviors/state.js').stateable;

import DataObject from './DataObject'

DataObject({ moment, sizeof });

const ddd = () => {
  return Object.assign(
    {},
    DataObject()
  );
};

module.exports = ddd;

export default ddd;
