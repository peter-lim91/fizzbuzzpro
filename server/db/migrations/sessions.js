exports.up = function (knex) {
  return knex.schema.createTable('sessions', (table) => {
    table.string('sid').primary()
    table.json('sess')
    table.timestamp('expired', { useTz: true })
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('sessions')
}
