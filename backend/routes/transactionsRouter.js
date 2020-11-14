import { db } from '../config/index.js'
const {
    moment,
    model,
    logger,
    mongodb: { ObjectID },
    express: { Router },
} = db

import * as Service from '../services/transactionService.js'

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        const {
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type,
        } = req.body

        const response = await Service.createTransaction({
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type,
        })
        res.send(response)

        logger('info', 'POST - API/transactions/')
        logger('info', `Result: ${JSON.stringify(response.newObject)}`)
    } catch (error) {
        logger('error', 'POST - API/transactions/')
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    const { period } = req.query
    try {
        if (!period)
            throw new Error(
                'É necessário informar o parâmetro *period* - Cujo valor deve estar no formado YYYY-MM | (Query Param)'
            )

        const validate = moment(period, 'YYYY-MM', true).isValid()
        if (!validate) throw new Error('Invalid Period!')

        const results = await Service.retrieveTransaction({
            yearMonth: { $regex: new RegExp(period, 'i') },
        })

        res.send(results)

        logger('info', `GET - API/transactions?period=${period}/`)
    } catch (error) {
        logger('error', `GET - API/transactions?period=${period}/`)
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.get('/allData', async (_, res, next) => {
    try {
        const results = await Service.retrieveTransaction()
        res.send(results)

        logger('info', 'GET - API/transactions/allData/')
    } catch (error) {
        logger('error', 'GET - API/transactions/allData/')
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        if (!ObjectID.isValid(id)) throw new Error('Invalid ID!')

        const result = await Service.retrieveTransaction(null, true, id)
        res.send(result)

        logger('info', `GET - API/transactions/${id}/`)
    } catch (error) {
        logger('error', `GET - API/transactions/${id}/`)
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const {
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type,
        } = req.body

        const validate = ObjectID.isValid(id)
        if (!validate)
            throw new Error('Invalid ID! It need to be an valid ObjectID')

        const response = await Service.updateTransaction(id, {
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type,
        })

        res.send(response)

        logger('info', `PUT - API/transactions/${id}/`)
        logger('info', `Result:  ${JSON.stringify(response.updatedObject)}`)
    } catch (error) {
        logger('error', `PUT - API/transactions/${id}/`)
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        await Service.deleteTransaction(id)
        res.send({ message: `Deleted th document: ${id}` })
        logger('info', `DELETE - API/transactions/${id}/`)
    } catch (error) {
        logger('error', `DELETE - API/transactions/${id}/`)
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.delete('/', async (_, res, next) => {
    try {
        await Service.deleteAllTransactions()
        res.send({ message: 'Deleted All database!' })
        logger('info', `DELETE - API/transactions/`)
    } catch (error) {
        logger('error', `DELETE - API/transactions/`)
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.use((error, req, res, next) => {
    if (res.statusCode === 400) {
        logger('error', `HTTP: Bad Request from client`)
        res.send({ error: error.message })
    } else {
        logger('error', error.message)
        res.status(500).send({ error: error.message })
    }
})

export { router as transactionsRouter }
