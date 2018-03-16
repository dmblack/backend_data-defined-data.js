// var models = require('./../db/models/state.models.js');

/**
 * Provides a loadable behavior to the object.
 * @param {any} state
 */
const loadable = (state) => ({
  loadable: {
    loaded: false
  },

  /**
   * Loads the record by instance ID.
   *  Requires id type number, and returns false if not.
   * @param {number} id - The record id to fetch.
   * @returns {object} state
   */
  load: function load(id) {
    if (typeof id !== 'number') { return false; }
    return new Promise(function (resolve, reject) {
      // Fill Instance information
      state.models.instance.readWhereIDEq(parseInt(id))
        .then(function (result) {
          Object.assign(state.instance, result);

          // Our Attributes History Promise
          var attributesHistoryPromise = new Promise(function (resolve, reject) {
            state.models.helpers.getAllAttributesHistoryByInstanceID(parseInt(id))
              .then(r => { resolve(r); })
              .catch(e => {
                reject(e);
              });
          });

          // Our Attributes promise.
          var attributesPromise = new Promise(function (resolve, reject) {
            state.models.helpers.getAllAttributesByInstanceID(parseInt(id))
              .then(r => { resolve(r); })
              .catch(e => {
                reject(e);
              });
          });

          // Our Definition promise.
          var definitionPromise = new Promise(function (resolve, reject) {
            state.models.definition.readWhereIDEq(parseInt(state.instance.definition_id))
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
  loadByPropertyAndValue: function loadByPropertyAndValue(value) {
    if (typeof value === 'undefined') { return false; }
    return new Promise(function (resolve, reject) {
      // Fill Instance information
      state.models.helpers.getInstanceByAttributeInstanceValue(value)
        .then(function (result) {
          if (typeof result === 'undefined') {
            reject(false);
          } else {
            Object.assign(state.instance, result);

            // Our Attributes History Promise
            var attributesHistoryPromise = new Promise(function (resolve, reject) {
              state.models.helpers.getAllAttributesHistoryByInstanceID(parseInt(result.id))
                .then(r => { resolve(r); })
                .catch(e => {
                  reject(e);
                });
            });

            // Our Attributes promise.
            var attributesPromise = new Promise(function (resolve, reject) {
              state.models.helpers.getAllAttributesByInstanceID(parseInt(result.id))
                .then(r => { resolve(r); })
                .catch(e => {
                  reject(e);
                });
            });

            // Our Definition promise.
            var definitionPromise = new Promise(function (resolve, reject) {
              state.models.definition.readWhereIDEq(parseInt(state.instance.definition_id))
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
              });
          }
        })
        .catch(function (error) {
          // An appropriate record was not found - reject.
          reject(state);
        });
    })
      .catch((error) => {
        console.log(error);
      });
  }
});

module.exports = loadable
