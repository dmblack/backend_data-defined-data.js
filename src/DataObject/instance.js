// let models = require('./../db/models/models.js');

const instance = (state, model, helpers, definition) => ({
  definition: () => {
    return state.models.definition.describe();
  },
  get: function load(id) {
    if (typeof id !== 'number') { return false; }
    return new Promise(function (resolve, reject) {
      // Fill Instance information
      model.readWhereIDEq(parseInt(id))
        .then(function (result) {
          Object.assign(state.instance, result);

          // Our Attributes History Promise
          var attributesHistoryPromise = new Promise(function (resolve, reject) {
            helpers.getAllAttributesHistoryByInstanceID(parseInt(id))
              .then(r => { resolve(r); })
              .catch(e => {
                reject(e);
              });
          });

          // Our Attributes promise.
          var attributesPromise = new Promise(function (resolve, reject) {
            helpers.getAllAttributesByInstanceID(parseInt(id))
              .then(r => { resolve(r); })
              .catch(e => {
                reject(e);
              });
          });

          // Our Definition promise.
          var definitionPromise = new Promise(function (resolve, reject) {
            definition.readWhereIDEq(parseInt(state.instance.definition_id))
              .then(r => { resolve(r); })
              .catch(e => {
                reject(e);
              });
          });

          // Perform the hard yards.
          Promise.all([attributesHistoryPromise, attributesPromise, definitionPromise])
            .then((resolved) => {
              resolved[0].forEach((attributesHistory) => { state.attributesHistory.push(attributesHistory); });
              resolved[1].forEach((attribute) => { state.attributes.push(attribute); });
              Object.assign(state.definition, resolved[2]);
              resolve(state);
            })
            .catch((rejected) => {
              console.log(rejected);
              reject(rejected);
            });
        })
        .catch(function (error) {
          console.log(error);
          reject(state);
        });
    });
  },
  set: (name) => {

  }
});

module.exports = instance;
