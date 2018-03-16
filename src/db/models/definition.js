// Query Builder Reference
var knex = require('../knex.js');

/**
 * Returns this model
 *
 * @returns Object - KNEX model
 */
function model () {
  return knex('definition');
}

function describe () {
  return new Promise(function (resolve, reject) {
    knex.raw('select * from INFORMATION_SCHEMA.COLUMNS where table_name = \'definition\';')
      .then((result) => {
        resolve(JSON.stringify(result));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// create

/**
 * Create with Object (object)
 *
 * @param {Object} object
 * @returns {Object} - Promise
 */
function createWithObject (object) {
  return model()
    .insert(object);
}

// delete

/**
 * Delete by ID (id)
 *
 * @param {Number} id
 * @returns {Object} - Promise
 */
function deleteByID (id) {
  if (typeof id === 'number') {
    return model()
      .where('id', parseInt(id))
      .del();
  } else {
    return false;
  }
}

/**
 * Delete where Column (colum) equal to Value (value)
 *
 * @param {String} column
 * @param {String} value
 * @returns {Object} - Promise
 */
function deleteWhereColumnEq (column, value) {
  if (typeof column === 'string' && typeof value === 'string') {
    return model()
      .where(column, value)
      .del();
  } else {
    return false;
  }
}

// read

/**
 * Read All (GET)
 *
 * @returns {Object} - Promise
 */
function readAll () {
  return model()
    .select();
}

/**
 * Read by ID
 *
 * @param {Number} id
 * @returns {Object} - Promise
 */
function readWhereIDEq (id) {
  if (typeof id === 'number') {
    return model()
      .select()
      .where('id', parseInt(id))
      .first();
  } else {
    return false;
  }
}

/**
 * Read Column (column) where ID equal to ID (id)
 *
 * @param {String} column
 * @param {Number} id
 * @returns {Object} - Promise
 */
function readColumnWhereIDEq (column, id) {
  if (typeof column === 'string' && typeof id === 'number') {
    return model()
      .select(column)
      .where('id', id)
      .first();
  } else {
    return false;
  }
}

/**
 * Read Column (getColumn) where Column (whereColumn) equal to Value (value)
 *
 * @param {String} getColumn
 * @param {String} whereColumn
 * @param {String} value
 * @returns {Object} - Promise
 */
function readColumnWhereColumnEq (getColumn, whereColumn, value) {
  if (typeof getColumn === 'string' && typeof whereColumn === 'string' && typeof value === 'string') {
    return model()
      .select(getColumn)
      .where(whereColumn, value)
      .first();
  } else {
    return false;
  }
}

/**
 * Read where Column (column) equal Value (value).
 *
 * @param {String} column
 * @param {String} value
 * @returns {Object} - Promise
 */
function readWhereColumnEq (column, value) {
  if (typeof column === 'string' && typeof value === 'string') {
    return model()
      .select()
      .where(column, value)
      .first();
  } else {
    return false;
  }
}

// update

/**
 * Update with Object (object) where ID (id)
 *
 * @param {Object} object
 * @param {Number} id
 * @returns {Object} - Promise
 */
function updateWithObjectByID (object, id) {
  if (typeof id === 'number') {
    return model()
      .where('id', id)
      .update(object);
  } else {
    return false;
  }
}

/**
 * Update with Object (object) where Column (column) equal to Value (value)
 *
 * @param {Object} object
 * @param {String} column
 * @param {String} value
 * @returns {Object} - Promise
 */
function updateWithObjectWhereColumnEq (object, column, value) {
  if (typeof column === 'string' && typeof value === 'string') {
    return model()
      .where(column, value)
      .update(object);
  } else {
    return false;
  }
}

module.exports = {
  createWithObject: createWithObject,
  deleteByID: deleteByID,
  deleteWhereColumnEq: deleteWhereColumnEq,
  describe: describe,
  readAll: readAll,
  readWhereIDEq: readWhereIDEq,
  readColumnWhereIDEq: readColumnWhereIDEq,
  readColumnWhereColumnEq: readColumnWhereColumnEq,
  readWhereColumnEq: readWhereColumnEq,
  updateWithObjectByID: updateWithObjectByID,
  updateWithObjectWhereColumnEq: updateWithObjectWhereColumnEq

};
