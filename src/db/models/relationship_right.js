// Query Builder Reference
var knex = require('../knex.js');
  // Used to reference helper functions (Like 'addUpdatedAtTo')
var helpers = require('./helpers.js');

/**
 * KNEX Relationship pointer
 *
 * @returns Object - KNEX 'relationship_right'
 */
function RelationshipRight () {
  return knex('relationship_right');
}

/**
 * Get all right relationships
 *
 * @returns {Object} - Promise
 */
function getAllRelationshipRight () {
  return RelationshipRight()
    .select();
}

/**
 * Get Right Relationship by ID
 *
 * @param {Numer} id
 * @returns {Object} - Promise
 */
function getRelationshipRightByID (id) {
  return RelationshipRight()
    .select().where('id', parseInt(id))
    .first();
}

/**
 * Add a Right Relationship
 *
 * @param {Object} object - With Key/Named Properties
 * @returns {Object} - Promise
 */
function addRelationshipRightByObject (object) {
  return RelationshipRight()
    .insert(object, 'id');
}

/**
 * Put (Update) a right relationship
 *
 * @param {Number} id
 * @param {Object} object - With Key/Named Properties
 * @returns {Object} - Promise
 */
function updateRelationshipRightByIDWithObject (id, object) {
  return RelationshipRight()
    .where('id', parseInt(id))
    .update(helpers.addUpdatedAtTo(object));
}

/**
 * Delete a Right Relationship By ID
 *
 * @param {Number} id
 * @returns {Object} - Promise
 */
function deleteRelationshipRightByID (id) {
  return RelationshipRight()
    .where('id', parseInt(id))
    .del();
}

module.exports = {
  addRelationshipRightByObject: addRelationshipRightByObject,
  deleteRelationshipRightByID: deleteRelationshipRightByID,
  getAllRelationshipRight: getAllRelationshipRight,
  getRelationshipRightByID: getRelationshipRightByID,
  updateRelationshipRightByIDWithObject: updateRelationshipRightByIDWithObject
};
