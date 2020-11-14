import winston from 'winston'
// import winstondb from 'winston-mongodb'

const { combine, printf, label, timestamp } = winston.format
const { File } = winston.transports
// const { MongoDB } = winstondb
// const { MONGODB } = process.env

/**
 * Make The String to LOG information
 * @param {{level: String, message: String, label: String, timestamp: String}} args
 */
const format = printf(({ level, message, label, timestamp }) => {
    return `[${label}] ["${level}" | ${timestamp}] ${message}`
})

const saveLogger = winston.createLogger({
    level: 'silly',
    transports: [
        new File({ filename: 'logs.log' }),
        // new MongoDB({
        //     level: 'info',
        //     db: MONGODB,
        //     collection: 'logs_transactions',
        //     capped: true,
        //     cappedMax: 50,
        //     options: {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        //     },
        // }),
    ],
    format: combine(
        label({ label: 'final-challenge -> BackEnd' }),
        timestamp({ format: 'DD-MM-YYYY - HH:mm:ss' }),
        format
    ),
})

export { saveLogger }
