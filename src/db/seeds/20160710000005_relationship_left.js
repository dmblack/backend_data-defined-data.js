exports.seed = function (knex, Promise) {
  return knex('relationship_left').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return knex('relationship_left').insert({
        instance_id: 1,
        type: '1-1'
      });
    });
};
