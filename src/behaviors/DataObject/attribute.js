// let models = require('./../db/models/models.js');

const attribute = (state) => ({
  attribute: () => {
    return state.models.attribute.describe();
  },
  get: () => {

  },
  set: (name) => {

  }
});

module.exports = attribute;
