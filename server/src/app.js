const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const apiRouter = require('./routes')

const app = express()

const NODE_ENV = process.env.NODE_ENV || 'development'

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

app.use(
    morgan('combined', {
        skip: () => NODE_ENV === 'production' && NODE_ENV === 'testing',
    })
)

app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api', apiRouter)

app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app
