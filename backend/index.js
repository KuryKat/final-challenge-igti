import express, { json, static } from 'express'
import cors from 'cors'
import { connect, connection } from 'mongoose'
import routes from './routes/routes'
import { join } from 'path'
import { config } from 'dotenv'

config()

const app = express()
app.use(cors({ origin: ['http://localhos:3000'] }))
app.use(json())

app.use(static(join(__dirname, 'client/build')))

app.get('/api/', (_, response) => {
    response.send({
        message:
            'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
    })
})

app.use('/api/transaction', routes)

const { DB_CONNECTION } = process.env
console.log('Iniciando conexão ao MongoDB...')

connect(
    DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    err => {
        if (err) {
            connectedToMongoDB = false
            console.error(`Erro na conexão ao MongoDB - ${err}`)
        }
    }
)

connection.once('open', () => {
    connectedToMongoDB = true
    console.log('Conectado ao MongoDB')

    const APP_PORT = process.env.PORT || 3001
    app.listen(APP_PORT, () => {
        console.log(`Servidor iniciado na porta ${APP_PORT}`)
    })
})
