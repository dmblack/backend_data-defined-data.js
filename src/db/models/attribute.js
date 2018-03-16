// Query Builder Reference
var knex = require('../knex.js');

/**
 * Describes this model
 *
 * @returns {JSON} - Description
 */
function describe () {
  var definition =
    {
      'get': {
        'description': 'Returns all attributes from the system. An attribute designates a property name, which will be associated to an instance of a definition.',
        'produces': [
          'application/json'
        ],
        'responses': {
          '200': {
            'description': 'A list of attributes.',
            'schema': {
              'type': 'array',
              'items': {
                '$ref': 'api/description/attribute'
              }
            }
          },
          '404': {
            'description': 'No records found.',
            'schema': {
              'type': 'null',
              'items': {
                '$ref': 'api/description/pet'
              }
            }
          },
          'default': {
            'description': 'error payload',
            'schema': {
              '$ref': '#/definitions/ErrorModel'
            }
          }
        }
      }
    };

  return definition;
}

/**
 * Returns this model
 *
 * @returns Object - KNEX model
 */
function model () {
  return knex('attribute');
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
 * Read where Column (column) equal Value (value).
 *
 * @param {String} column
 * @param {String} value
 * @returns {Object} - Promise
 */
function readAllWhereColumnEq (column, value) {
  if (typeof column === 'string' && typeof value === 'string') {
    return model()
      .select()
      .where(column, value);
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
  readAll: readAll,
  readAllWhereColumnEq: readAllWhereColumnEq,
  readWhereIDEq: readWhereIDEq,
  readColumnWhereIDEq: readColumnWhereIDEq,
  readColumnWhereColumnEq: readColumnWhereColumnEq,
  readWhereColumnEq: readWhereColumnEq,
  updateWithObjectByID: updateWithObjectByID,
  updateWithObjectWhereColumnEq: updateWithObjectWhereColumnEq,

  describe: describe
};
