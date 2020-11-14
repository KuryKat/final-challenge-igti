import winston from 'winston'
import { colour } from '../colour.js'

const { combine, printf, label, timestamp } = winston.format
const { Console } = winston.transports

// args = { level, message, label, timestamp }

/**
 * Make The String to LOG information (with colors, yay)
 * @param {{level: String, message: String, label: String, timestamp: String}} args
 */
const stringMaker = ({ level, message, label, timestamp }) => {
    const defaultString = () => colour('cyan', `[${label}]`)

    const levelColor = () => {
        const thisFormat = `["${level.toUpperCase()}" | ${timestamp}]`
        if (level === 'error') {
            return colour('niceRed', thisFormat)
        } else if (level === 'warn') {
            return colour('gold', thisFormat)
        } else if (level === 'info') {
            return colour('lightgreen', thisFormat)
        }
    }
    const finalFormatted = `${colour(
        'BOLD',
        `${defaultString()} ${levelColor()} ${message}`
    )}`

    return finalFormatted
}
const format = printf(args => {
    return stringMaker(args)
})

const logger = winston.createLogger({
    level: 'info',
    transports: [new Console()],
    format: combine(
        label({ label: 'final-challenge -> BackEnd' }),
        timestamp({ format: 'HH:mm:ss' }),
        format
    ),
})

export { logger }
