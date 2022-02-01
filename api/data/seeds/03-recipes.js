/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {recipe_id: 11, title: 'Heirloom Potato Stew', source: 'Grandpa Jo', instructions: 'Boil heirloom potatoes in chicken broth.', category: 'soup',user_id: 55},
        {recipe_id: 12, title: 'Mashed Carrots',  source: 'Great Aunt May', instructions: 'Boil carrots in vegetable broth.', category: 'side',user_id: 56},
        {recipe_id: 13, title: 'Boiled Cabbage ', source: 'Cousin Arthur', instructions: 'cabbage', category: 'side',user_id: 57},
      ]);
    });
};
