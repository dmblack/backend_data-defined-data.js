exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('attribute', function (table) {
      table.increments('id')
        .primary();
      table.string('name')
        .comment('This is the name of the attribute, such as "Given Name"')
        .notNullable();
      table.enu('type', ['date', 'number', 'string'])
        .comment('This field denotes the type we will perform validation for.')
        .notNullable();
      table.string('description')
        .comment('This should include an accurate description of the item. Dictionary sources work best.');
      table.timestamp('created_at')
        .comment('Represents the time this record was created')
        .defaultTo(knex.fn.now());
      table.integer('created_by')
        .defaultTo(1)
        .notNullable()
        .unsigned();
      table.timestamp('updated_at')
        .comment('Represents the time the record was last updated.');
      table.integer('updated_by')
        .defaultTo(1)
        .notNullable()
        .unsigned();
      table.unique('name')
        .comment('Represents the name of the attribute. Such as "First Name"');
      table.comment('This table is describes attributes, associated to instances.');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('attribute')
  ]);
};
