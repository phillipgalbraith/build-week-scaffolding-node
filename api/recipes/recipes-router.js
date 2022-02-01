const express = require('express');
const { checkAuthenticated  } = require('../middleware/middleware.js')
const {getCategoryRecipes} = require('./recipes-model')
// You will need `recipes-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Recipes = require('./recipes-model');

const router = express.Router();

router.get('/', async (req, res) => {
  const recipes = await Recipes.getAllRecipes();
  res.status(200).json(recipes);
});

router.get('/categories/:category_name', async (req, res) => {
    const recipes = await Recipes.getCategoryRecipes(req.params.category_name);
    res.status(200).json(recipes);
  });
//dev http --pretty='none' :9000/api/recipes/categories/soup

router.post('/', async (req, res) => {
  res.status(201).json(await Recipes.insertRecipe(req.body))
})

//dev http :9000/api/recipes instructions="boil beef" category="main course" source="Great Aunt Elaine" title="Safety Beef" "user_id"=57

router.delete('/:recipe_id', async (req, res) => {
  res.status(201).json(await Recipes.deleteRecipe(req.params.recipe_id))
  })
//dev http --pretty='none' DELETE :9000/api/recipes/1

router.put('/', async (req, res) => {
  const updatedRecipe = await Recipes.updateRecipe(req.body)
  try{
    res.status(201).json(updatedRecipe[0])
  } catch {
    res.status(500).json( {error: 'internal server error'})
  }
})
//dev http pretty='none' PUT :9000/api/recipes instructions="tenderize and boil beef" category="main course" source="Great Aunt Elaine" title="Safety Beef" "recipe_id"=2

// router.post('/', async (req, res) => {
//   // RETURN THE NEWLY CREATED USER OBJECT
//   // this needs a middleware to check that the request body is valid
//   const newRecipe = await Recipes.insert(req.body);
//   res.status(200).json(newRecipe);
// });

// router.put('/:id', async (req, res) => {
//   // RETURN THE FRESHLY UPDATED USER OBJECT
//   // this needs a middleware to verify recipe id
//   // and another middleware to check that the request body is valid
//   const updatedRecipe = await Recipes.update(req.params.id, req.body);
//   res.status(200).json(updatedRecipe);
// });

// router.delete('/:id', async (req, res) => {
//   // RETURN THE FRESHLY DELETED USER OBJECT
//   // this needs a middleware to verify recipe id
//   const deletedRecipe = await Recipes.getById(req.params.id);
//   await Recipes.remove(req.params.id);
//   res.status(200).json(deletedRecipe);
// });

module.exports = router
