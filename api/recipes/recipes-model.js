const db = require('../data/db-config')

async function insertRecipe(recipe) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  const [newRecipeObject] = await db('recipes').insert(recipe, ['recipe_id', 'title', 'instructions', 'category', 'source', 'user_id' ])
  return newRecipeObject // 
}

function getAllRecipes() { return db('recipes') }

async function getCategoryRecipes(category_name) {
    const recipes = await db('recipes').where('category', category_name)
    return recipes
}

async function deleteRecipe(recipe_id) {
  await db('recipes').where('recipe_id', recipe_id)
    .del()
  return db('recipes')
}

async function updateRecipe(recipe) {
  const {
    recipe_id,
    instructions,
    title,
    source,
   } = recipe
   
  return db('recipes')
  .where('recipe_id', recipe_id)
  .update({ instructions: instructions, title: title, source: source}, ['instructions', 'title', 'source'])
}

module.exports = {
    insertRecipe,
    getAllRecipes,
    getCategoryRecipes,
    deleteRecipe,
    updateRecipe
}