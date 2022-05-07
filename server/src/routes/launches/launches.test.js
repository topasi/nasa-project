const request = require('supertest')
const app = require('../../app')

describe('GET /api/launches', () => {
    it('should respond with 200 success', async () => {
        await request(app).get('/api/launches').expect('Content-Type', /json/).expect(200)
    })
})

describe('POST /api/launches', () => {
    const completeLaunchData = {
        mission: 'USS Enterprice',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2028',
    }
    const launchDataWithoutDate = {
        mission: 'USS Enterprice',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
    }
    const launchDataWithInvalidDate = {
        mission: 'USS Enterprice',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'invalid date',
    }
    it('should respond with 201 created', async () => {
        const response = await request(app).post('/api/launches').send(completeLaunchData).expect('Content-Type', /json/).expect(201)
        const requestDate = new Date(completeLaunchData.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()
        expect(response.body).toMatchObject(launchDataWithoutDate)
        expect(requestDate).toBe(responseDate)
    })
    it('should catch missing required properties', async () => {
        const response = await request(app).post('/api/launches').send(launchDataWithInvalidDate).expect('Content-Type', /json/).expect(400)
        expect(response.body).toStrictEqual({
            error: 'Invalid launch date',
        })
    })
    it('should catch invalid dates', async () => {})
})
