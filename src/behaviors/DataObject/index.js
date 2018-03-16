let attribute = require('./attribute.js');
let definition = require('./definition.js');
let instance = require('./instance.js');
let load = require('./load.js');
let save = require('./save.js');
let models = require('./../../db/models/')

let DataObject = (state) => {
  state = Object.assign({}, state, { models: models })
  return Object.assign(
    {},
    attribute(state),
    definition(state),
    instance(state),
    load(state),
    save(state)
  );
}

module.exports = {
  DataObject
};

export default DataObject;
