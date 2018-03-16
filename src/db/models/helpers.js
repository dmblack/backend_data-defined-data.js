// Query Builder Reference
var knex = require('..//knex.js');
  // Used for common date manipulation
var moment = require('moment');
var sizeof = require('object-sizeof');

// function Definitions () {
//   return knex('definition');
// }

function Attributes () {
  return knex('attribute');
}

function Instances () {
  return knex('instance');
}

function InstanceAttributes () {
  return knex('instance_attribute');
}

function InstanceAttributesHistory () {
  return knex('instance_attribute_history');
}

/*
 * - - - - BEGIN ACL MANAGEMENT
 */

// It's important that these line up to the Attributes SEEDED.
//      and instead of overhead of a query upon startup, I propose
//      these are hardcoded.

var ACLAttributes = {
  'NAME': 1,
  'SIZE': 2,
  'MASK': 3,
  'UID': 4,
  'GID': 5,
  'ACCESS': 6,
  'MODIFY': 7,
  'CHANGE': 8,
  'CREATE': 9
};

var metaAttributes = {
  'NAME': 1,
  'SIZE': 2, // Meta Size of the instance, including Meta Information - but always updated after a meta change.
  'MASK': 3, // The Access mask (Eg; 0644)
  'UID': 4, // User ID of the Meta ACL
  'GID': 5, // Group ID of the Meta ACL
  'ACCESS': 6, // the last time the record was read
  'MODIFY': 7, // the last time the record was modified (content has been modified)
  'CHANGE': 8, // the last time meta data of the record was changed (e.g. permissions)
  'CREATE': 9 // Obvious
};

// function addUpdatedBySystemPropertyToObject (object) {
//   object.updated_by = 1;
//   return object;
// }

var changeDate;

function initMeta (instanceID) {
  var promises = [];

  for (var id in metaAttributes) {
    if (metaAttributes.hasOwnProperty(id)) {
      promises.push(InstanceAttributes()
        .insert({
          instanceId: instanceID,
          attribute_id: metaAttributes[id],
          value: 'null',
          created_by: 1
        })
        .then(r => { return r; })
        .catch(e => { console.log(e); })
      );
    }
  }

  Promise.all(promises)
    .then(r => {
      return r;
    })
    .catch(e => {
      console.log(e);
    });
}

/**
 * This function should trigger all the updates associated with a record update.
 *
 *  Currently; CHANGE, SIZE
 *
 * @param {Number} instanceID
 */
function modifyMeta (instanceID) {
  var newDate = moment().format('YYYY-MM-DD HH:mm:ss');
  var promises = [];

  if (typeof instanceID === 'number') {
    var updateMetas = {
      'SIZE': 2, // Meta Size of the instance, including Meta Information - but always updated after a meta change.
      'MODIFY': 7, // the last time the record was modified (content has been modified)
      'CHANGE': 8 // the last time meta data of the record was changed (e.g. permissions)
    };

    for (var id in updateMetas) {
      if (updateMetas.hasOwnProperty(id)) {
        promises.push(InstanceAttributes()
          .where('instanceId', instanceID)
          .andWhere('attribute_id', updateMetas[id])
          .update({
            updated_at: newDate,
            value: newDate
          })
          .then(r => { return r; })
          .catch(e => { console.log(e); })
        );
      }
    }

    Promise.all(promises)
      .then(r => {
        console.log(r);
        return r;
      })
      .catch(e => {
        console.log(e);
      });
  } else {
    return false;
  }
}

/**
 * Get Meta Size of an Instance by ID. Does not include META information in total size (Intentional)
 *
 * Depends on the object-sizeof (and lodash) libraries.
 *
 * @param {Number} instanceID
 * @returns {Number} - Size in bytes.
 */
function getSizeOfInstanceByID (instanceID) {
  return InstanceAttributes()
    .where('instanceId', instanceID)
    .whereNot('attribute_id', '<=', 9)
    .select()
    .then(function (instance) {
      return sizeof(instance);
    })
    .catch(function (error) {
      console.log('Error: Calculating size of Instance: %s failed due to error: %s', instanceID, error);
      return false;
    });
}

/**
 * Get Meta Value of an Instance by ID and the Meta Name
 *
 * @param {Number} instanceID
 * @param {string} metaName
 * @returns {object} Promise
 */
// function getMetaValueOfInstanceByIDAndMetaName (instanceID, metaName) {
//   var attributeID = metaAttributes[metaName];

//   return InstanceAttributes()
//     .where('attribute_id', attributeID)
//     .andWhere('instanceId', instanceID)
//     .select('value');
// }

/**
 * Get Meta Data of an Instance by ID
 *
 * @param {Number} instanceID
 * @returns {Object} Promise
 */
// function getMetaDataOfInstanceByID (instanceID) {
//   return InstanceAttributes()
//     .where('instanceId', instanceID)
//     .whereNot('attribute_id', '=>', '10')
//     .select();
// }

// function touchMetaAccessOfInstanceID (instanceID) {
//   var accessValue = moment().format('YYYY-MM-DD HH:mm:ss');
//   updateMetaByNameForInstanceIDWithValue('ACCESS', instanceID, accessValue);
//   return true;
// }

/**
 * Create Meta by Name for Instance by ID with Value
 *
 * @param {String} metaName
 * @param {Number} instanceID
 * @param {String} value
 * @returns {Object} result
 */
function createMetaByNameForInstanceIDWithValue (metaName, instanceID, value) {
  return InstanceAttributes()
    .insert(
    {
      instanceId: instanceID,
      attribute_id: metaAttributes[metaName],
      value: value,
      created_by: 1
    }
    );
}

/**
 * Update Meta by Name for Instance ID with Value
 *
 * @param {String} metaName
 * @param {Number} instanceID
 * @param {String} value
 * @returns {Object} result
 */
function updateMetaByNameForInstanceIDWithValue (metaName, instanceID, value) {
  // var changeDate = moment().format("YYYY-MM-DD HH:mm:ss");

  console.log('Change Date: %s', changeDate);

  return InstanceAttributes()
    .where('instanceId', instanceID)
    .andWhere('attribute_id', metaAttributes[metaName])
    .update({
      value: value,
      updated_by: 1,
      'updated_at': changeDate
    });
}

/**
 * Trigger General Meta Data Update by Instance ID
 *
 * Used when general changes are made to an instance, and will update 'CHANGE', and 'SIZE'.
 *
 * @param {Number} instanceID
 * @returns {Boolean} False - True
 */
function triggerGeneralMetaUpdateByInstanceID (instanceID) {
  // Size
  // Change
  changeDate = moment().format('YYYY-MM-DD HH:mm:ss');
  var sizeOf = getSizeOfInstanceByID(instanceID);

  // Size
  checkMetaExistsByNameAndInstanceID('SIZE', instanceID)
    .then(function (result) {
      if (result === undefined) {
        createMetaByNameForInstanceIDWithValue('SIZE', instanceID, sizeOf);
      } else {
        updateMetaByNameForInstanceIDWithValue('SIZE', instanceID, sizeOf);
      }
      return true;
    })
    .catch(function (error) {
      console.log('CRITICAL: META Update of Instance ID: %s failed due to error: %s', instanceID, error);
      return false;
    });

  // Change
  checkMetaExistsByNameAndInstanceID('CHANGE', instanceID)
    .then(function (result) {
      if (result === undefined) {
        createMetaByNameForInstanceIDWithValue('CHANGE', instanceID, changeDate);
      } else {
        updateMetaByNameForInstanceIDWithValue('CHANGE', instanceID, changeDate);
      }
      return true;
    })
    .catch(function (error) {
      console.log('CRITICAL: META Update of Instance ID: %s failed due to error: %s', instanceID, error);
      return false;
    });
}

/**
 * Check ACL Record Property by Name and Instance. Should no be called outside of instance.js at this stage.
 *
 * @param {String} propertyId - ACCESS, MODIFY, CHANGE, CREATE
 * @param {Number} instanceId - Of the relative instance.
 * @returns {Object} - Promise
 */
function checkMetaExistsByNameAndInstanceID (propertyId, instanceId) {
  // console.log('2 - Checking ACL For Instance: %s, ACL: %s', instanceId, ACLAttributes[propertyId])
  return InstanceAttributes()
    .select()
    .where('attribute_id', ACLAttributes[propertyId])
    .andWhere('instanceId', parseInt(instanceId))
    .first();
}

/**
 * Check ACL Record Property by Name and Instance. Should no be called outside of instance.js at this stage.
 *
 * @param {String} propertyId - ACCESS, MODIFY, CHANGE, CREATE
 * @param {Number} instanceId - Of the relative instance.
 * @returns {Object} - Promise
 */
function checkACLRecordPropertyByNameAndInstanceWithID (propertyId, instanceId) {
  // console.log('2 - Checking ACL For Instance: %s, ACL: %s', instanceId, ACLAttributes[propertyId])
  return InstanceAttributes()
    .select()
    .where('attribute_id', ACLAttributes[propertyId])
    .andWhere('instanceId', parseInt(instanceId))
    .first();
}

/**
 * Updates the record property 'size' by Instance ID
 *
 * @param {Number} instanceId
 */
function updateACLRecordPropertySizeByInstanceID (instanceID) {
  // Size
  // Change
  // var changeDate = moment().format('YYYY-MM-DD HH:mm:ss');
  var sizeOf;

  getSizeOfInstanceByID(instanceID)
    .then(function (result) {
      sizeOf = result;
    })
    .then(function () {
      checkMetaExistsByNameAndInstanceID('SIZE', instanceID)
        .then(function (result) {
          if (result === undefined) {
            console.log('Instance (%s) size: %s', instanceID, sizeOf);
            return createMetaByNameForInstanceIDWithValue('SIZE', instanceID, sizeOf);
          } else {
            return updateMetaByNameForInstanceIDWithValue('SIZE', instanceID, sizeOf);
          }
        })
        .catch(function (error) {
          console.log('CRITICAL: META Update of Instance ID: %s failed due to error: %s', instanceID, error);
        });
    })
    .catch(function (error) {
      console.log('Could not calculate the sizeof instance with error; %s', error);
    });
}

/**
 * Update an ACL Record by Property Name (ACCESS, MODIFY, CREATE, CHANGE) with Instance ID using Moment
 *
 * @param {String} propertyId - ACCESS, MODIFY, CHANGE, CREATE
 * @param {Number} instanceId
 * @returns {Object} - Promise
 */
function updateACLRecordPropertyByNameAndInstanceIDWithMoment (propertyId, instanceId) {
  // var changeDate = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log('Our changedate is: %s', changeDate);
  checkACLRecordPropertyByNameAndInstanceWithID(propertyId, instanceId)
    .then(function (result) {
      // A result indicates that the ACL record already exists. If no result; create it - else; update it!
      if (result === undefined) {
        return InstanceAttributes()
          .returning(['attribute_id', 'instanceId'])
          .insert({
            attribute_id: ACLAttributes[propertyId],
            instanceId: instanceId,
            value: moment().format('YYYY-MM-DD HH:mm:ss'),
            // Hard coded - All ACL records should be created by UID '1', which is a seeded system instance or person 'System'.
            created_by: 1
          }, 'instanceId')
          .then(function (result) {
            console.log('Our ACL Should be created for: %s', instanceId);
            console.log('This is our ACL Create Result: %s', result);
            return instanceId;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log('2 - ACL Exists: %s', JSON.stringify(result));
        InstanceAttributes()
          .where('instanceId', instanceId)
          .andWhere('attribute_id', ACLAttributes[propertyId])
          .update({
            value: changeDate,
            updated_by: 1,
            updated_at: changeDate
          })
          .then(r => { return r; })
          .catch(e => { console.log(e); });
      }
    })
    .catch(function (error) {
      console.log('Our error is: %s', error);
    });
}

/**
 * Add an ACL Record by Property Name (ACCESS, MODIFY, CREATE, CHANGE) with Instance ID using Moment
 *
 * @param {String} propertyId - ACCESS, MODIFY, CHANGE, CREATE
 * @param {Number} instanceId
 * @returns {Object} - Promise
 */
function addACLRecordPropertyByNameAndInstanceIDWithMoment (propertyId, instanceId) {
  checkACLRecordPropertyByNameAndInstanceWithID(propertyId, instanceId)
    .then(function (result) {
      // A result indicates that the ACL record already exists. If no result; create it - else; update it!
      if (result === undefined) {
        return InstanceAttributes()
          .returning('*')
          .insert({
            attribute_id: ACLAttributes[propertyId],
            instanceId: instanceId,
            value: moment().format('YYYY-MM-DD HH:mm:ss'),
            // Hard coded - All ACL records should be created by UID '1', which is a seeded system instance or person 'System'.
            created_by: 1
          });
      } else {
        console.log('We need to update this next record: %s', instanceId);
        return InstanceAttributes()
          .where('instanceId', instanceId)
          .andWhere('attribute_id', ACLAttributes[propertyId])
          .update({
            'value': moment().format('YYYY-MM-DD HH:mm:ss'),
            // Hard coded - All ACL records should be created by UID '1', which is a seeded system instance or person 'System'.
            'updated_by': 1
          });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

/*
 * - - - - END ACL MANAGEMENT
 */

/**
 * Add's a property to an object with the current date/time as defined by moment.
 *
 * @param {Object} object
 * @returns Object with Additional Value
 */
function addUpdatedAtTo (object) {
  object.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  return object;
}

/**
 * Add an object, to an object.
 *
 * @param {Object} addObject - The item you wish to add
 * @param {Object} object - The item you wish to add to.
 * @returns Object - With additional object.
 */
// function addObjectToObjectAsProperty (addObject, object, property) {
//   if (!object.hasOwnProperty(property)) {
//     object[property] = addObject;
//   }
//   return object;
// }

/**
 * Forms a final Data Object (For API use), from piece of Attributes, Definition, and Instance.
 *
 * @param {Object} attributes
 * @param {Object} definition
 * @param {Object} instance
 */
// function formFinalDataObjectFromAttributesDefinitionInstance (attributes, definition, instance) {
//   var thisDefinition = definition.name,
//     returnObject = {
//       thisDefinition: {
//         definition: definition,
//         instance: instance,
//         attributes: attributes
//       }
//     };
//   return returnObject;
// }

/**
 * Returns an Instance that has an Instance_Attribute.value of the supplied value.
 *
 * @param {String} value - The value of an Instance_Attribute.value you wish to search for.
 * @returns
 */
function getInstanceByAttributeInstanceValue (value) {
  return Instances()
    .select(['instance.id', 'instance.definition_id', 'instance.created_at', 'instance.updated_at'])
    .leftJoin('instance_attribute', 'instance.id', 'instance_attribute.instance_id')
    .where('instance_attribute.value', value)
    .first();
}

/**
 * Get All Attributes by InstanceID
 *
 * @param {Number} instanceId - The instance ID to gather all attributes for
 * @returns Promise
 */
function getAllAttributesHistoryByInstanceID (instanceID) {
  return Attributes()
    .select(`attribute.id as attribute__id`, `attribute.name as attribute__name`, `attribute.type as attribute__type`, `attribute.description as attribute__description`, `attribute.created_at as attribute__created_at`, `attribute.created_by as attribute__created_by`, `attribute.updated_at as attribute__updated_at`, `attribute.updated_by as attribute__updated_by`, `instance_attribute_history.attribute_id as instance_attribute__attribute_id`, `instance_attribute_history.instance_id as instance_attribute__instanceId`, `instance_attribute_history.value as instance_attribute__value`, `instance_attribute_history.created_at as instance_attribute__created_at`, `instance_attribute_history.created_by as instance_attribute__created_by`, `instance_attribute_history.updated_at as instance_attribute__updated_at`, `instance_attribute_history.updated_by as instance_attribute__updated_by`)
    .leftJoin('instance_attribute_history', 'attribute.id', 'instance_attribute_history.attribute_id')
    .where('instance_attribute_history.instance_id', parseInt(instanceID));
}

/**
 * Get All Attributes (History) by InstanceID
 *
 * @param {Number} instanceId - The instance ID to gather all attributes for
 * @returns Promise
 */
function getAllAttributesByInstanceID (instanceID) {
  return Attributes()
    .select(`attribute.id as attribute__id`, `attribute.name as attribute__name`, `attribute.type as attribute__type`, `attribute.description as attribute__description`, `attribute.created_at as attribute__created_at`, `attribute.created_by as attribute__created_by`, `attribute.updated_at as attribute__updated_at`, `attribute.updated_by as attribute__updated_by`, `instance_attribute.attribute_id as instance_attribute__attribute_id`, `instance_attribute.instance_id as instance_attribute__instanceId`, `instance_attribute.value as instance_attribute__value`, `instance_attribute.created_at as instance_attribute__created_at`, `instance_attribute.created_by as instance_attribute__created_by`, `instance_attribute.updated_at as instance_attribute__updated_at`, `instance_attribute.updated_by as instance_attribute__updated_by`)
    .leftJoin('instance_attribute', 'attribute.id', 'instance_attribute.attribute_id')
    .where('instance_attribute.instance_id', parseInt(instanceID));
}

/**
 * Get Attribute by DefinitionID and AttributeName
 *
 * @param {Number} definitionID - The
 * @param {any} attributeName - The 'name' of the Attribute value.
 * @returns Promise
 */
function getAttributeByDefinitionIDAndAttributeName (definitionID, attributeName) {
  return Attributes()
    .select()
    .leftJoin('instance_attribute', 'attribute.id', 'instance_attribute.attribute_id')
    .leftJoin('instance', 'instance_attribute.instanceId', 'instance.id')
    .leftJoin('definition', 'instance.definition_id', 'definition.id')
    .where('definition.id', definitionID)
    .andWhere('attribute.name', attributeName)
    .first();
}

module.exports = {
  addUpdatedAtTo: addUpdatedAtTo,
  getInstanceByAttributeInstanceValue: getInstanceByAttributeInstanceValue,
  getAllAttributesByInstanceID: getAllAttributesByInstanceID,
  getAllAttributesHistoryByInstanceID: getAllAttributesHistoryByInstanceID,
  getAttributeByDefinitionIDAndAttributeName: getAttributeByDefinitionIDAndAttributeName,

  addACLRecordPropertyByNameAndInstanceIDWithMoment: addACLRecordPropertyByNameAndInstanceIDWithMoment,
  getSizeOfInstanceByID: getSizeOfInstanceByID,
  triggerGeneralMetaUpdateByInstanceID: triggerGeneralMetaUpdateByInstanceID,
  updateACLRecordPropertyByNameAndInstanceIDWithMoment: updateACLRecordPropertyByNameAndInstanceIDWithMoment,
  updateACLRecordPropertySizeByInstanceID: updateACLRecordPropertySizeByInstanceID,

  initMeta: initMeta,
  modifyMeta: modifyMeta
};
