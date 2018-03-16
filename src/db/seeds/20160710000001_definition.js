exports.seed = function (knex, Promise) {
  return knex('definition').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return knex('definition').insert({
        name: 'Person',
        description: 'a human being regarded as an individual.'
      });
    })
    .then(function () {
      return knex('definition').insert({
        name: 'User',
        description: 'a person who uses or operates something.'
      });
    })
    .then(function () {
      return knex('definition').insert({
        name: 'Transaction',
        description: 'A transaction is an exchange of items between two, or more, parties.'
      });
    });
};
