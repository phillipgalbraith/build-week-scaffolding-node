/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 55, username: 'username55', password: 'password55'},
        {user_id: 56, username: 'username56', password: 'password56'},
        {user_id: 57, username: 'username57', password: 'password57'},
      ]);
    });
};
