const mongoose = require('mongoose')

require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URI, {
        keepAlive: true,
        keepAliveInitialDelay: 300000,
        connectTimeoutMS: 60000,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 60000,
    })
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}
