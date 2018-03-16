exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('instance', function (table) {
      table.increments('id')
        .primary();
      table.integer('definition_id')
        .comment('An instance is associated to a definition, provided here')
        .notNullable()
        .unsigned();
      table.foreign('definition_id')
        .references('id')
        .inTable('definition')
        .onDelete('cascade');
      table.timestamp('created_at')
        .defaultTo(knex.fn.now());
      table.integer('created_by')
        .defaultTo(1)
        .notNullable()
        .unsigned();
      table.timestamp('updated_at');
      table.integer('updated_by')
        .defaultTo(1)
        .notNullable()
        .unsigned();
      table.comment('Creates an instance of a definition, ready for attributes');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('instance', function (table) {
      table.dropForeign('definition_id');
    }).then.dropTable,
    knex.schema.dropTable('instance')
  ]);
};
