import moment from 'moment'
import { open, writeFile } from 'fs/promises'
import { createReadStream, createWriteStream } from 'fs'
import { promisify } from 'util'
import { createGzip } from 'zlib'
import { pipeline } from 'stream'

import { db } from '../../config/index.js'
const { logger } = db

/**
 * Create a new File Name checking if the last exist or not
 * @param {import('fs').PathLike} defaultName
 * @return {Promise<String>} The created file name
 */
const createFileName = async defaultName => {
    /**
     * @param {import('fs').PathLike} name
     */
    const checkifExist = async name => {
        let result = false
        try {
            const operation = await open(name, 'r')
            if (operation.fd === 4) result = true
            await operation.close()
        } catch (error) {
            if ((error.code = 'ENOENT')) result = false
            else {
                logger(
                    'error',
                    `Erro ao checar se o arquivo existe: ${error.message}`
                )
            }
        }
        return result
    }

    const nameGen = () => {
        const timestamp = moment(new Date(), true).format('YYYY-MM-DD')
        const randomNumber = Math.ceil(Math.random() * 100)
        const randomString = () => {
            let characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let result = ''
            for (let i = 0; i < 5; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                )
            }
            return result
        }
        /**
         * @type {Number}
         */
        const indexOfExtension = defaultName.indexOf('.log.gz')

        const fileName = defaultName.slice(0, indexOfExtension)
        const extension = defaultName.slice(indexOfExtension)
        return `${fileName}-${timestamp}(${randomNumber}${randomString()})${extension}`
    }

    let newFile = nameGen()
    let exist = await checkifExist(newFile)
    while (exist) {
        newFile = nameGen()
        exist = await checkifExist(newFile)
    }
    return newFile
}

/**
 * Create a GZip file to save the backup log
 * @param {import('fs').PathLike} input
 * @param {import('fs').PathLike} output
 */
const makeGZip = async (input, output) => {
    const fileName = await createFileName(output)
    const pipe = promisify(pipeline)
    await pipe(
        createReadStream(input),
        createGzip(),
        createWriteStream(fileName)
    )
}

/**
 * Create a Log file to make log history
 * @param {import('fs').PathLike} latestLogPath
 * @param {import('fs').PathLike} backupLogPath
 */
const createBackupLog = async (latestLogPath, backupLogPath) => {
    try {
        logger('warn', 'Making the log file to backup...')
        await makeGZip(latestLogPath, backupLogPath)
        logger('info', 'Log file created! Backup Done!')
        writeFile(latestLogPath, '')
    } catch (error) {
        logger(
            'error',
            'Error when trying to backup the latest log: ' + error.message
        )
    }
}

export { createBackupLog }
