import { db } from './config/index.js'
const {
    express,
    express: { json },
    logger,
    mongoose: { connect, connection },
} = db
import { createBackupLog } from './utils/logger/createBackup.js'

import { cleanUp } from './utils/cleanUp.js'

cleanUp(async () => {
    logger('warn', 'WARNING: Finishing the server')
    await createBackupLog('./logs/latest.log', './logs/log.log.gz')
})

logger('info', 'Running on NodeJS: ' + process.version)

import cors from 'cors'
import { transactionsRouter as routes } from './routes/transactionsRouter.js'

import { config } from 'dotenv'
config()

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(cors({ origin: ['http://localhost:3000'] }))
app.use(json())

app.use(express.static(join(__dirname, 'client/build')))

app.get('/api/', (_, response) => {
    response.send({
        message: 'Bem-vindo à API de lançamentos!',
    })
})

app.use('/api/transactions', routes)

const { MONGODB } = process.env
logger('info', 'Iniciando conexão ao MongoDB...')

connect(
    MONGODB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    err => {
        if (err) {
            logger('error', `Erro na conexão ao MongoDB - ${err.message}`)
            process.emit('cleanup')
        }
    }
)

connection.once('open', () => {
    logger('info', 'Conectado ao MongoDB')

    const APP_PORT = process.env.PORT || 3001
    app.listen(APP_PORT, () => {
        logger('info', `Servidor iniciado na porta ${APP_PORT}`)
    })
})
