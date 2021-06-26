'use strict'

const {db } = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')


  const users = await Promise.all([
    User.create({ username: 'cody', password: '123'}),
    User.create({ username: 'murphy', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if(module === require.main) {
  runSeed()
}

module.exports = seed
