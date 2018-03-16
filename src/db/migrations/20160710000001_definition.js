exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('definition', function (table) {
      table.increments('id')
        .primary();
      table.string('name')
        .comment('The very name of the defined item, such as "Person"')
        .unique()
        .notNullable();
      table.string('description')
        .comment('A field to record a description');
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
      table.comment('Declares the very definition, by association, of instances');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('definition')
  ]);
};
