/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first_name: 'John', last_name: 'Doe', username: 'JohnDoe1', password:'abcd1234'},
    {id: 2, first_name: 'Jane', last_name: 'Doe', username: 'JaneDoe1', password:'abcd1234'},
  ]);
};
