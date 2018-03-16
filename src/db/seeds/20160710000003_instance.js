/*
 * Returns our Instance object.
 *
 * @returns {Object} - KNEX `instance`
 */
var Instances = require('../models/instance.js');

exports.seed = function (knex, Promise) {
  return knex('instance').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return Instances.createWithObject({
        definition_id: 1
      });
    })
    .then(function () {
      return Instances.createWithObject({
        definition_id: 1
      });
    });
};
