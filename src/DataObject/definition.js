// let models = require('./../db/models/models.js');

const definition = (model) => (state) => ({
  definition: {
    hasDefinition: false,
    definition: null,
    model
  },
  /**
   * Assigns a DataWarehouse definition to an object.
   * 
   * @param {number} id - The ID Of the definition to assign.
   * @returns 
   */
  giveDefinition: function giveDefinition (value) {
    return new Promise(function (resolve, reject) {
      state.models.definition.readWhereColumnEq('name', value)
        .then((result) => {
          state.hasDefinition = true;
          // state.definition.definition = result;
          resolve(state);
        })
        .catch((fail) => {
          console.log(fail);
          reject(state);
        });
    });
  },
  get: (property) => {
    return state.definition[property];
  },
  set: (name, value) => {
    state.definition[name] = value;
  }
});

module.exports = definition;
