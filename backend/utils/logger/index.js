import { logger as consoleLogger } from './logger.js'
import { saveLogger } from './saveLogger.js'

/**
 * Make Logs:
 * * Print in console (with colors o.O)
 * * Save in file
 * @param {String} type
 * @param {String} text
 */
export const logger = (type, text) => {
    saveLogger.log(type, text)
    consoleLogger.log(type, text)
}
