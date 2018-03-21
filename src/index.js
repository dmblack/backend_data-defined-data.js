import DataObject from './DataObject';

const models = require('./db/models/');
const moment = require('moment');
const sizeof = require('object-sizeof');
const stateable = require('./behaviors/state.js').stateable;

const ddd = () => {
  return Object.assign(
    {},
    DataObject()
  );
};

module.exports = ddd;

export default ddd;
