const db = require('../data/db-config')

async function insertUser(user) {
  
  const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
  return newUserObject 
}

function getAllUsers() { return db('users') }

async function getUserByUsername(username) {
    const user = await db('users').where('username', username).first() 
    
    return user
}


module.exports = {
    insertUser,
    getAllUsers,
    getUserByUsername
}