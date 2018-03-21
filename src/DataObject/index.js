let attribute = require('./attribute.js');
let definition = require('./definition.js');
let instance = require('./instance.js');
let load = require('./load.js');
let save = require('./save.js');
let models = require('./../db/models/')

let DataObject = (state) => {
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
    attribute(state, models.attribute),
    definition(state, models.definition),
    instance(state, models.instance, models.helpers, models.definition),
    // load(state, model.instance),
    // save(state)
  );
}

module.exports = DataObject;

export default DataObject;
