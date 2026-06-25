const mongoose = require('mongoose');
const dns = require('dns');

require('dotenv').config();


const connectDB = async () => {
    dns.setServers(['8.8.8.8','8.8.4.4'])
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log('DB CONNECTED....');
    } catch (error) {
        console.error('MongoDB Error:', error);
    }
};

module.exports = connectDB;