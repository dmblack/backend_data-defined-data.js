exports.seed = function (knex, Promise) {
  // Used this to keep seeded data valid, due to implementation of ACL records
  //      pushing the key values of these attribute's down.
  var attributes = {
    'surname': 10,
    'givenname': 11,
    'middlename': 12,
    'gender': 13,
    'email': 14,
    'password': 15,
    'salt': 16,
    'user': 17,
    'websess': 18
  };

  return knex('instance_attribute').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return knex('instance_attribute').insert({
        attribute_id: attributes.surname,
        instance_id: 1,
        value: 'System'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.givenname,
        instance_id: 1,
        value: 'Data'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.middlename,
        instance_id: 1,
        value: 'Warehouse'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.gender,
        instance_id: 1,
        value: 'undefined'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.email,
        instance_id: 1,
        value: 'support@remexchange.net'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.password,
        instance_id: 1,
        value: '$2a$10$heWJ9H7e5lcEqRKJh4nR5uTNx33mUt1OuIbKYB0u0ejhXzt09x7Vq'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.salt,
        instance_id: 1,
        value: '$2a$10$C5IB3wTlhzjg.mbgRsmkAO'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.user,
        instance_id: 1,
        value: 'support@remexchange.net'
      });
    })

    .then(function () { // Inserts seed entries one by one in series
      return knex('instance_attribute').insert({
        attribute_id: attributes.surname,
        instance_id: 2,
        value: 'Test'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.givenname,
        instance_id: 2,
        value: 'Unit'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.middlename,
        instance_id: 2,
        value: 'Warehouse'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.gender,
        instance_id: 2,
        value: 'undefined'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.email,
        instance_id: 2,
        value: 'unit.test@remexchange.net'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.password,
        instance_id: 2,
        value: '60642801b875e3d6553d7064b34cc89168761e7b296a894cb3f7443697601ab15feccdad7dc32363e850f0b612e82e0d5e7c82b7dbec77155e4f81a2cf4f15bd'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.salt,
        instance_id: 2,
        value: 'sutjJjsu8wk93uJ5'
      });
    }).then(function () {
      return knex('instance_attribute').insert({
        attribute_id: attributes.user,
        instance_id: 2,
        value: 'unit.test@remexchange.net'
      });
    });
};
