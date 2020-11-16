import winston from 'winston'

const { combine, printf, label, timestamp } = winston.format
const { File } = winston.transports

/**
 * Make The String to LOG information
 * @param {{level: String, message: String, label: String, timestamp: String}} args
 */
const format = printf(({ level, message, label, timestamp }) => {
    return `[${label}] ["${level}" | ${timestamp}] ${message}`
})

const saveLogger = winston.createLogger({
    level: 'silly',
    transports: [new File({ filename: './logs/latest.log' })],
    format: combine(
        label({ label: 'final-challenge -> BackEnd' }),
        timestamp({ format: 'DD-MM-YYYY - HH:mm:ss' }),
        format
    ),
})

export { saveLogger }
