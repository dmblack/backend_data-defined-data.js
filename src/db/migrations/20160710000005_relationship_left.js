exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('relationship_left', function (table) {
      table.increments('id')
        .primary();
      table.integer('instance_id')
        .comment('This is a reference to the defined left relationships instance id.')
        .notNullable();
      table.enu('type', ['1-1', '1-M', 'M-M'])
        .comment('This field denotes the type we will perform validation for.')
        .defaultTo('1-1')
        .notNullable();
      table.timestamp('created_at')
        .comment('Represents the time this record was created')
        .defaultTo(knex.fn.now());
      table.timestamp('updated_at')
        .comment('Represents the time the record was last updated.');
      table.unique('instance_id');
      table.comment('Defines relationship type against parent instance id.');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('relationship_left')
  ]);
};
