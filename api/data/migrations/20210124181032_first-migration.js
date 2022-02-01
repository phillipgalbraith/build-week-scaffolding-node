exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })

  await knex.schema
    .createTable('recipes', (recipes) => {
      recipes.increments('recipe_id')
      recipes.string('title', 200).notNullable()
      recipes.string('instructions', 200).notNullable()
      recipes.string('category', 200).notNullable()      
      recipes.string('source', 200).notNullable()
      recipes
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })       
}
    

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('recipes')
  await knex.schema.dropTableIfExists('users')
}
