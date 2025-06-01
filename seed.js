require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./models/task');
const { faker } = require('@faker-js/faker');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27018/taskmanager';

async function seedTask() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB');

        //clear colection first
        await Task.deleteMany({});
        console.log('Tasks cleared');

        //crete 10 tasks using faker lib
        
        // const tasks = Array.from({ length: 10 }).map(() => ({
        //     title: faker.hacker.phrase(),
        //     description: faker.lorem.sentence(),
        //     status: faker.helpers.arrayElement(['pending', 'in-progress', 'done']),
        //     dueDate: faker.date.future(),
        // }));

        //we can use map or for
        const tasks = []
        for (let i = 0; i < 10; i++) {
            tasks.push({
                title: faker.hacker.phrase(),
                description: faker.lorem.sentence(),
                status: faker.helpers.arrayElement(['pending', 'in-progress', 'done']),
                dueDate: faker.date.future(),
            })
        }

        await Task.insertMany(tasks);
        console.log('10 tasks created');

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1); //O 1 significa que algo deu errado, entao o programa para de executar e mostra o erro
    }
}

seedTask();