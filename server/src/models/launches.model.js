const launches = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100

const launch = {
    flightNumber: DEFAULT_FLIGHT_NUMBER,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({ keplerName: launch.target })
    if (!planet) {
        throw new Error('No matching planet found')
    }
    await launches.findOneAndUpdate(
        {
            flightNumber: launch.flightNumber,
        },
        launch,
        {
            upsert: true,
        }
    )
}

saveLaunch(launch)

async function existsLaunchWithId(launchId) {
    return await launches.findOne({ flightNumber: launchId })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne().sort('-flightNumber')
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }
    return latestLaunch.flightNumber
}

async function getAllLaunches() {
    return await launches.find({}, { _id: 0, __v: 0 })
}

async function scheduleNewlaunch(launch) {
    const newFlightNumber = (await getLatestFlightNumber()) + 1
    const newLaunch = Object.assign(launch, {
        customers: ['ZTM', 'NASA'],
        upcoming: true,
        success: true,
        flightNumber: newFlightNumber,
    })
    await saveLaunch(newLaunch)
}

async function abortLaunchById(launchId) {
    const aborted = await launches.updateOne(
        {
            flightNumber: launchId,
        },
        {
            upcoming: false,
            success: false,
        }
    )
    return aborted.matchedCount === 1 && aborted.modifiedCount === 1
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewlaunch,
    abortLaunchById,
}