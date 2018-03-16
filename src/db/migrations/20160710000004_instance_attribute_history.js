exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('instance_attribute_history', function (table) {
      table.increments('id')
        .primary();
      table.integer('attribute_id')
        .comment('Associated attribute')
        .notNullable()
        .unsigned();
      table.integer('instance_id')
        .comment('Associated instance')
        .notNullable()
        .unsigned();
      table.string('value')
        .comment('Value of this associated bridging table')
        .defaultTo('undefined')
        .notNullable();
      table.enu('method', ['DELETE', 'GET', 'POST', 'PUT'])
        .comment('DELETE: Delete, GET: Query, POST: Create, PUT: Update')
        .notNullable();
      table.timestamp('created_at')
        .comment('Represents the time this record was created')
        .defaultTo(knex.fn.now());
      table.integer('created_by')
        .notNullable()
        .unsigned();
      table.timestamp('updated_at');
      table.integer('updated_by')
        .nullable()
        .unsigned();
      table.foreign('attribute_id')
        .references('id')
        .inTable('attribute')
        .onDelete('cascade');
      table.foreign('instance_id')
        .references('id')
        .inTable('instance')
        .onDelete('cascade');
      table.comment('This table contains historical attribute_instances');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('instance_attribute_history', function (table) {
      table.dropForeign('definition_id');
      table.dropForeign('instance_id');
    }).then.dropTable,
    knex.schema.dropTable('instance_attribute_history')
  ]);
};
