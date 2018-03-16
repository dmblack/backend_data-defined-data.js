exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('definition_attribute', function (table) {
      table.integer('attribute_id')
        .comment('Associated attribute')
        .notNullable()
        .unsigned();
      table.integer('definition_id')
        .comment('Associated defininition')
        .notNullable()
        .unsigned();
      table.boolean('required')
        .comment('Defines if this attribute is mandatory on each instance')
        .defaultTo(false)
        .notNullable();
      table.string('required_prompt')
        .comment('Defines the message shown if the default is not met')
        .defaultTo('This field is required')
        .notNullable();
      table.boolean('validation')
        .comment('Defines if validation is enabled')
        .defaultTo(false)
        .notNullable();
      table.string('validation_regex')
        .comment('Defines the regex, plain, for text valudation')
        .defaultTo('^null|$')
        .notNullable();
      table.string('validation_regex_prompt')
        .comment('Defines the regex valixation prompt, should it not be met')
        .defaultTo('This field did not meet input requirements.')
        .notNullable();
      table.string('default')
        .comment('Default value associated to this attribute')
        .defaultTo('undefined')
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
      table.unique(['definition_id', 'attribute_id']);
      table.foreign('attribute_id')
        .references('id')
        .inTable('attribute')
        .onDelete('cascade');
      table.foreign('definition_id')
        .references('id')
        .inTable('definition')
        .onDelete('cascade');
      table.comment('This table contains attribute_instance bridge values');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('definition_attribute', function (table) {
      table.dropForeign('definition_id');
      table.dropForeign('attribute_id');
    }).then.dropTable,
    knex.schema.dropTable('definition_attribute')
  ]);
};
