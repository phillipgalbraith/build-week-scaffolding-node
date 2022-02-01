const User = require('../users/users-model')

async function validateUser (req, res, next) {
  const {username, password} = req.body
  const user = await User.getUserByUsername(username)
  console.log('password provided: ', password, '////password in database:  ', user)
  try {
    if (!user || password !== user.password) {
      return res.status(401).json({ error: 'Incorrect credentials' });
    } else {
      req.user = {
        username: user.username,
        user_id: user.user_id
      }
      next()
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function validateUsername (req, res, next) {
  const {username} = req.body
  const user = await User.getUserByUsername(username)

  try { 
    if (user) {
      return res.status(401).json({ error: 'Username taken' });
    } else {
      next()
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
 
}

function checkAuthenticated (req, res, next) {

  if (!req.session){
    return res.status(401).json({'message': 'there is no session'})
  }
  else if(req.session.user_id !== req.params.user_id) { 
    res.status(401).json({'message': 'wrong session id'})
    } else {
      next() 
    }
}



module.exports = {
    validateUser,
    validateUsername,
    checkAuthenticated 
}