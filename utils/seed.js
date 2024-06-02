const connection = require('../config/connection');
const { Users, Thoughts } = require('../models');
const { getRandomName, getRandomAssignments, getRandomthoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }


    // Create empty array to hold the students
    const users = [];

    // Loop 20 times -- add students to the students array
    for (let i = 0; i < 5; i++) {
        // Get some random assignment objects using a helper function that we imported from ./data
        const thoughts = getRandomthoughts(1);

        const fullName = getRandomName();
        const first = fullName.split(' ')[0];
        const last = fullName.split(' ')[1];

        users.push({
            first,
            last,
            thoughts,
        });
    }

    // Add users to the collection and await the results
    const userData = await Users.create(users);

    // Add courses to the collection and await the results
    await Users.create({
        users: [...userData.map(({ _id }) => _id)],
    });

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
