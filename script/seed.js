'use strict'

const {db } = require('../server/db')
const {User, Pose, Workout} = require('../server/db/models')
const posesData = require('./poses.json')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const poses = await Promise.all(
    posesData.map((pose) => Pose.create({
      name: pose.name,
      nameSanskrit: pose.nameSanskrit
    }))
  )

  const users = await Promise.all([
    User.create({ username: 'cody', password: '123'}),
    User.create({ username: 'murphy', password: '123'})
  ])

  const workouts = await Promise.all([
    Workout.create({name: 'Slow Flow'}),
    Workout.create({name: 'Power Flow'})
  ])

 await workouts[0].setUser(users[0])
 await workouts[1].setUser(users[0])

 await workouts[0].addPoses(poses)
 await workouts[1].addPoses(poses[0])
 await workouts[1].addPoses(poses[3])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${poses.length} poses`)
  console.log(`seeded ${workouts.length} workouts`)
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
