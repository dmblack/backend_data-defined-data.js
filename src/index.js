import {DataObject} from './behaviors/dataobject.js';

const models = require('./db/models/');
const moment = require('moment');
const sizeof = require('object-sizeof');
const stateable = require('./behaviors/state.js').stateable;

const ddd = () => {
  let state = {
    instance: {},
    definition: {},
    attributes: [],
    attributesHistory: [],
    relationships: []
  };

  return Object.assign(
    {},
    DataObject(state),
    stateable(state)
  );
};

module.exports = ddd;

export default ddd;
