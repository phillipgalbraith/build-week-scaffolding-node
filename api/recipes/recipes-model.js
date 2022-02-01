const db = require('../data/db-config')

async function insertRecipe(recipe) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  const [newRecipeObject] = await db('recipes').insert(recipe, ['recipe_id', 'title', 'instructions', 'category', 'source', 'user_id' ])
  return newRecipeObject // 
}

function getAllRecipes() { return db('recipes') }

module.exports = {
    insertRecipe,
    getAllRecipes
}