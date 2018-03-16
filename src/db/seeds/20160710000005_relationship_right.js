exports.seed = function (knex, Promise) {
  return knex('relationship_right').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return knex('relationship_right').insert({
        instance_id: 2,
        relationshipleft_id: 1
      });
    });
};
