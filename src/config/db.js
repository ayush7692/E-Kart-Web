const mongoose = require('mongoose');
const dns = require('dns');

require('dotenv').config();

// Force Node.js to prefer IPv4
dns.setDefaultResultOrder('ipv4first');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log('DB CONNECTED....');
        console.log(`Host: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB Error:', error);
    }
};

module.exports = connectDB;