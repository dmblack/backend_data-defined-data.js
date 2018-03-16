// Note that this file is seeding the appropriate definition_attributes, as well.
//      I might place this in it's own seed in future.

exports.seed = function (knex, Promise) {
  return knex('attribute').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      // 1
      return knex('attribute').insert({
        name: 'META-NAME',
        type: 'string',
        description: 'A Record Name returns the records unique id, which is likely to be a hash of the entire record'
      });
    }).then(function () {
      // 2
      return knex('attribute').insert({
        name: 'META-SIZE',
        type: 'string',
        description: 'A Record Size attribute should return the total length of a records attributes key, and values'
      });
    }).then(function () {
      // 3
      return knex('attribute').insert({
        name: 'META-ACL-MASK',
        type: 'number',
        description: 'A Record Access attribute returns the permissions, following the unix standard, of a record and it\'s attributes. These are cascading permissions.'
      });
    }).then(function () {
      // 4
      return knex('attribute').insert({
        name: 'META-ACL-UID',
        type: 'number',
        description: 'A Record UID (User ID) returns the User ID of the records owner, as per the Record Access permission set'
      });
    }).then(function () {
      // 5
      return knex('attribute').insert({
        name: 'META-ACL-GID',
        type: 'number',
        description: 'A Record GID (Group ID) returns the Group ID of the records owner, as per the Record Access permission set'
      });
    }).then(function () {
      // 6
      return knex('attribute').insert({
        name: 'META-ACCESS',
        type: 'date',
        description: 'the last time the record was read'
      });
    }).then(function () {
      // 7
      return knex('attribute').insert({
        name: 'META-MODIFY',
        type: 'date',
        description: 'the last time the record was modified (content has been modified)'
      });
    }).then(function () {
      // 8
      return knex('attribute').insert({
        name: 'META-CHANGE',
        type: 'date',
        description: 'the last time meta data of the record was changed (e.g. permissions)'
      });
    }).then(function () {
      // 9
      return knex('attribute').insert({
        name: 'META-CREATE',
        type: 'date',
        description: 'A Record Date should return the time a record was created.'
      });
    }).then(function () {
      return knex('attribute').insert({
        name: 'Surname',
        type: 'string',
        description: 'a hereditary name common to all members of a family, as distinct from a forename or given name.'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 1,
        definition_id: 1,
        default: '',
        required: true,
        validation: true,
        validation_regex: '^null|$',
        validation_regex_prompt: 'Can not be null.',
        created_by: 0
      });
    }).then(function () {
      // 2
      return knex('attribute').insert({
        name: 'Given Name',
        type: 'string',
        description: 'a personal name given to someone at birth or baptism and used before a family name.'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 2,
        definition_id: 1,
        default: '',
        required: true,
        validation: true,
        validation_regex: '^null|$',
        validation_regex_prompt: 'Can not be null.',
        created_by: 0
      });
    }).then(function () {
      // 3
      return knex('attribute').insert({
        name: 'Middle Name',
        type: 'string',
        description: 'a person\'s name placed after the first name and before the surname.'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 3,
        definition_id: 1,
        default: '',
        required: false,
        validation: true,
        validation_regex: '^null|$',
        validation_regex_prompt: 'Can not be null.',
        created_by: 0
      });
    }).then(function () {
      // 4
      return knex('attribute').insert({
        name: 'Gender',
        type: 'string',
        description: 'the state of being male or female (typically used with reference to social and cultural differences rather than biological ones).'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 4,
        definition_id: 1,
        default: '',
        required: false,
        validation: true,
        validation_regex: '^(?:m|M|male|Male|MALE|f|F|female|Female|FEMALE)$',
        validation_regex_prompt: 'Should match something like; F, M, female, male, Female, Male, FEMALE, MALE',
        created_by: 0
      });
    }).then(function () {
      return knex('attribute').insert({
        name: 'Email Address',
        type: 'string',
        description: 'an email address consists of two parts, a local-part and a domain-part separated by an “@” – in steve@example.com, steve is the local-part and example.com is the domain-part.'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 5,
        definition_id: 1,
        default: '',
        required: true,
        validation: true,
        validation_regex: '^([a-zA-Z0-9_-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})$',
        validation_regex_prompt: 'Does not meet the requirements of an email - should include target@domain.tld',
        created_by: 0
      });
    }).then(function () {
      return knex('attribute').insert({
        name: 'Password',
        type: 'string',
        description: 'a secret word or phrase that must be used to gain admission to a place.'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 6,
        definition_id: 1,
        default: '',
        required: true,
        validation: true,
        validation_regex: '^(?=.*d)(?=.*[a-zA-Z])(?!.*s).{8}$',
        validation_regex_prompt: 'Must be greater than 8 characters, contain at least one capital, and contain at least one number.',
        created_by: 0
      });
    }).then(function () {
      return knex('attribute').insert({
        name: 'Salt Hash',
        type: 'string',
        description: 'a secret word or phrase that is used to hash a password.'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 7,
        definition_id: 1,
        default: '',
        required: true,
        validation: true,
        validation_regex: '^(?=.*d)(?=.*[a-zA-Z])(?!.*s).{16}$',
        validation_regex_prompt: 'Must be greater than 8 characters, contain at least one capital, and contain at least one number.',
        created_by: 0
      });
    }).then(function () {
      return knex('attribute').insert({
        name: 'User Name',
        type: 'string',
        description: 'an email address consists of two parts, a local-part and a domain-part separated by an “@” – in steve@example.com, steve is the local-part and example.com is the domain-part.'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 8,
        definition_id: 1,
        default: '',
        required: true,
        validation: true,
        validation_regex: '^([a-zA-Z0-9_-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})$',
        validation_regex_prompt: 'Does not meet the requirements of an email - should include target@domain.tld',
        created_by: 0
      });
    }).then(function () {
      return knex('attribute').insert({
        name: 'Web Session ID',
        type: 'string',
        description: 'A session ID is a unique number that a Web site\'s server assigns a specific user for the duration of that user\'s visit (session)'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 9,
        definition_id: 1,
        default: '',
        required: false,
        validation: false,
        created_by: 0
      });
    }).then(function () {
      return knex('attribute').insert({
        name: 'Value',
        type: 'number',
        description: 'A value can be associated to multiple records, however was created to define the monetary value of a transaction.'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 10,
        definition_id: 3,
        default: '0.00',
        required: true,
        validation: true,
        validation_regex: '^(?=.*d){3}$',
        validation_regex_prompt: 'Input must only be numbers, and should not include $, or currency abbreviations.',
        created_by: 0
      });
    }).then(function () {
      return knex('attribute').insert({
        name: 'Date',
        type: 'date',
        description: 'A date can be associated to multiple definitions, however was created to define the date of a transaction,'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 11,
        definition_id: 3,
        default: 'DD/MM/YYYY HH:MM:SS',
        required: false,
        validation: true,
        validation_regex: '^(?=.*d)(?=.*[a-zA-Z])(?!.*s).{6,12}$',
        created_by: 0
      });
    }).then(function () {
      return knex('attribute').insert({
        name: 'Description',
        type: 'string',
        description: 'A description can be associated to multiple definitions, however was created to define the description of a transaction.'
      });
    }).then(function (res) {
      return knex('definition_attribute').insert({
        attribute_id: 12,
        definition_id: 1,
        default: '',
        required: false,
        validation: true,
        validation_regex: '^null|$',
        validation_regex_prompt: 'Description, if required, must NOT be null.',
        created_by: 0
      });
    });
};
