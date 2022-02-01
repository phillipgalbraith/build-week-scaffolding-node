const express = require('express')
const bcrypt = require('bcryptjs')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model')
const {validateUser, validateUsername} = require('../middleware/middleware.js')
const { SECRET_ROUNDS } = require("../secrets") // use this secret!

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await Users.getAllUsers()
  res.status(200).json(users)
})
//http

router.post('/login', validateUser, (req, res) => {
  res.status(201).json(req.user)
})
// dev http --pretty='none' :9000/api/users/login username=username4 password=password4


router.post('/', validateUsername, async (req, res) => {
    const credentials = req.body
    //const hash = bcrypt.hashSync(credentials.password, SECRET_ROUNDS)
    //credentials.password = hash
    const user = await Users.insertUser(credentials)
    try{
      res.status(201).json(user)
    } catch { 
      res.status(500).json({ error: 'internal server error'})
    }
  })
// dev http --pretty='none' :9000/api/users username=username5 password=password5

router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
            res.status(500).json({ message: "Internal Logout Error"})
        } else {
          res.status(200).json({ message: 'Logged out successfully'});
        }
      });
    }
  });

// router.post('/', async (req, res) => {
//   // RETURN THE NEWLY CREATED USER OBJECT
//   // this needs a middleware to check that the request body is valid
//   const newUser = await Users.insert(req.body)
//   res.status(200).json(newUser)
// })

// router.put('/:id', async (req, res) => {
//   // RETURN THE FRESHLY UPDATED USER OBJECT
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
//   const updatedUser = await Users.update(req.params.id, req.body)
//   res.status(200).json(updatedUser)
// })

// router.delete('/:id', async (req, res) => {
//   // RETURN THE FRESHLY DELETED USER OBJECT
//   // this needs a middleware to verify user id
//   const deletedUser = await Users.getById(req.params.id)
//   await Users.remove(req.params.id)
//   res.status(200).json(deletedUser)
// })

module.exports = router
