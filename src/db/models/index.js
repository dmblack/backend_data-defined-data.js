// Used as helper functions - Where common or cross model specific code goes
var helpers = require('./helpers.js');
  // The rest of these are just models as required.
var attribute = require('./attribute.js');
var definition = require('./definition.js');
var instance = require('./instance.js');
var instanceattribute = require('./instance_attribute.js');
// instanceattributehistory    = require('./instance_attribute_history.js'),
// let relationshipleft            = require('./relationship_left.js');
// relationshipright           = require('./relationship_right.js');

module.exports = {
  helpers: helpers,
  attribute: attribute,
  definition: definition,
  instance: instance,
  instanceattribute: instanceattribute,
  // instanceattributehistory:   instanceattributehistory,
  // relationshipleft:           relationshipleft
  // relationshipright:          relationshipright
};
