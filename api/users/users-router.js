const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await Users.getAllUsers();
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
    res.status(201).json(await Users.insertUser(req.body))
  })
// dev http :9000/api/users username=username4 password=password4

 router.get('/:id', (req, res) => {
   // RETURN THE USER OBJECT
   // this needs a middleware to verify user id
   res.status(200).json(req.user);
 });

// router.post('/', async (req, res) => {
//   // RETURN THE NEWLY CREATED USER OBJECT
//   // this needs a middleware to check that the request body is valid
//   const newUser = await Users.insert(req.body);
//   res.status(200).json(newUser);
// });

// router.put('/:id', async (req, res) => {
//   // RETURN THE FRESHLY UPDATED USER OBJECT
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
//   const updatedUser = await Users.update(req.params.id, req.body);
//   res.status(200).json(updatedUser);
// });

// router.delete('/:id', async (req, res) => {
//   // RETURN THE FRESHLY DELETED USER OBJECT
//   // this needs a middleware to verify user id
//   const deletedUser = await Users.getById(req.params.id);
//   await Users.remove(req.params.id);
//   res.status(200).json(deletedUser);
// });

module.exports = router
