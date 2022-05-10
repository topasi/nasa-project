const http = require('http')

// const cluster = require('cluster')
// const os = require('os')

const app = require('./app')
const { mongoConnect } = require('./services/mongo.service')

const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
    await mongoConnect()
    await loadPlanetsData()
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

// if (cluster.isMaster) {
//     console.log('Master has been started...')
//     const NUM_WORKERS = os.cpus()
//     for (let i = 0; i < NUM_WORKERS; i++) {
//         cluster.fork()
//     }
// } else {
//     console.log('Worker process started...')
//     startServer()
// }

startServer()
