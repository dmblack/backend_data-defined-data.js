// let models = require('./../db/models/models.js');

const instance = (state) => ({
  definition: () => {
    return state.models.definition.describe();
  },
  get: () => {

  },
  set: (name) => {

  }
});

module.exports = instance;
