const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/softuni-booking';

module.exports = async (app) => {
    try {
        mongoose.connect(connectionString , {
           useUnifiedTopology: true,
           useNewUrlParser: true
        });
        console.log('databaseConnected');
    }catch(err) {
        console.error('Error database');
        console.error(err.message);
        process.exit(1);
    }
};

