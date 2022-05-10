const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://rapzki03:mongodb183461@nasa-project-instance.zllly.mongodb.net/nasa?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URI)
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}
