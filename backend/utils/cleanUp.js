import { db } from '../config/index.js'
const { logger } = db

/**
 * Default callback for cleanUp function
 * @return {Promise<void>}
 */
const defaultCallback = async () => {
    return new Promise(resolve => {
        resolve(logger('info', 'Exited!'))
    })
}

/**
 * run the callback when the process is finished by any cause
 * @param callback The callback to make the cleanUp
 */
const cleanUp = (callback = defaultCallback) => {
    process.on('cleanup', async () => {
        await callback()
        process.exit()
    })

    process.on('exit', () => {
        logger('info', 'Bye bye~!')
    })

    process.on('SIGINT', () => {
        logger('warn', 'Ctrl-C...')
        process.emit('cleanup')
    })

    process.on('uncaughtException', err => {
        logger('warn', 'Uncaught Exception...')
        logger('error', err.message)
        process.emit('cleanup')
    })

    process.on('unhandledRejection', err => {
        logger('warn', 'Unhandled Rejection...')
        logger('error', err.message)
        process.emit('cleanup')
    })
}

export { cleanUp }
