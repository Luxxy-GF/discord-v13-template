const mongoose = require('mongoose');
const config = require(`../config.json`)

module.exports = {
    init: () => {

        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            // reconnectTries: Number.MAX_VALUE,
            // reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family:4
        };

        mongoose.connect(`${config.mongodb}`, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        mongoose.connection.setMaxListeners(15);

        mongoose.connection.on('connected', () => {
            console.log(`\nMongoose has successfully connected!`);
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn(`Mongoose connection lost`);
        });
    }
}