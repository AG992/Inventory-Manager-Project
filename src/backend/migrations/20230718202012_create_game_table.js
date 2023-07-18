/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('game_list', table => {
    table.increments('id');
    table.smallint('user_id')
    table.foreign('user_id').references('users.id').onUpdate('CASCADE') .onDelete('CASCADE');
    table.string('title').notNullable();
    table.string('release_date').notNullable();
    table.string('developer').notNullable();
    table.text('description');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('game_list')
};
