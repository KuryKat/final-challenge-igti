import { db } from '../config/index.js'
const { logger } = db

/**
 * Default callback for cleanUp function
 * @return {void}
 */
const defaultCallback = () => logger('info', 'Exited!')

/**
 * run the callback when the process is finished by any cause
 * @param callback The callback to make the cleanUp
 */
const cleanUp = (callback = defaultCallback) => {
    process.on('cleanup', callback)

    process.on('exit', () => {
        process.emit('cleanup')
    })

    process.on('SIGINT', () => {
        logger('warn', 'Ctrl-C...')
        process.exit()
    })

    process.on('uncaughtException', err => {
        logger('warn', 'Uncaught Exception...')
        logger('error', err.message)
        process.exit(99)
    })
}

export { cleanUp }
