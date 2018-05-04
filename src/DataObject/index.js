const attribute = require('./attribute.js');
const definition = require('./definition.js');
const instance = require('./instance.js');

const stateable = require('./state.js');

const DataObject = (refs) => (state) => {
  if (typeof state === 'undefined' || state ==='') {
    state = {
      instance: {},
      definition: {},
      attributes: [],
      attributesHistory: [],
      relationships: []
    };
  }

  return Object.assign(
    {},
    attribute(state),
    definition(state),
    instance(state)
  );
}

module.exports = DataObject;

export default DataObject;
