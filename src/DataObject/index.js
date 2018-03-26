let models = require('./../db/models/');
let attribute = require('./attribute.js')(models.attribute);
let definition = require('./definition.js')(models.definition);
let instance = require('./instance.js')(models.instance)(models.helpers)(models.definition);
let load = require('./load.js');
let save = require('./save.js');

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
    attribute(state),
    definition(state),
    instance(state),
    // load(state, model.instance),
    // save(state)
  );
}

module.exports = DataObject;

export default DataObject;
