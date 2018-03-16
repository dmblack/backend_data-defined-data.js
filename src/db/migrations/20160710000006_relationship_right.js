exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('relationship_right', function (table) {
      table.integer('instance_id')
        .comment('This is a reference to the defined left relationships instance id.')
        .notNullable();
      table.integer('relationshipleft_id')
        .comment('This is a reference to the defined left relationships instance id.')
        .notNullable();
      table.timestamp('created_at')
        .comment('Represents the time this record was created')
        .defaultTo(knex.fn.now());
      table.timestamp('updated_at')
        .comment('Represents the time the record was last updated.');
      table.unique(['relationshipleft_id', 'instance_id']);
      table.comment('Defines the relationship to child item from parent.');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('relationship_right')
  ]);
};
