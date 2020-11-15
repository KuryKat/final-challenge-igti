import { db } from '../config/index.js'
const {
    moment,
    logger,
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

        await Service.createTransaction(
            {
                description,
                value,
                category,
                year,
                month,
                day,
                yearMonth,
                yearMonthDay,
                type,
            },
            { validateBeforeSave: true },
            err => {
                if (err) {
                    logger('error', 'POST - API/transactions')
                    res.status(400)
                    next(err)
                }
            },
            response => {
                res.send(response)
                logger('info', 'POST - API/transactions')
                logger('info', `Result: ${JSON.stringify(response.object)}`)
            }
        )
    } catch (error) {
        logger('error', 'POST - API/transactions')
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    const { period } = req.query
    if (!period) {
        try {
            await Service.retrieveTransaction(
                null,
                null,
                null,
                err => {
                    if (err) {
                        logger('error', `GET - API/transactions`)
                        res.status(400)
                        next(err)
                    }
                },
                response => {
                    res.send(response)
                    logger('info', 'GET - API/transactions')
                }
            )
        } catch (error) {
            logger('error', 'GET - API/transactions')
            if (error.name === 'Error') res.status(400)
            next(error)
        }
    } else {
        try {
            if (!moment(period, 'YYYY-MM', true).isValid())
                throw new Error(
                    'Período incorreto - O período deve estar no formato YYYY-MM'
                )
            await Service.retrieveTransaction(
                {
                    yearMonth: { $regex: new RegExp(period, 'i') },
                },
                null,
                null,
                err => {
                    if (err) {
                        logger(
                            'error',
                            `GET - API/transactions?period=${period}`
                        )
                        res.status(400)
                        next(err)
                    }
                },
                response => {
                    res.send(response)
                    logger('info', `GET - API/transactions?period=${period}`)
                }
            )
        } catch (error) {
            logger('error', `GET - API/transactions?period=${period}`)
            if (error.name === 'Error') res.status(400)
            next(error)
        }
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        await Service.retrieveTransaction(
            null,
            true,
            id,
            err => {
                if (err) {
                    logger('error', `GET - API/transactions/${id}`)
                    res.status(400)
                    next(err)
                }
            },
            response => {
                res.send(response)
                logger('info', `GET - API/transactions/${id}`)
            }
        )
    } catch (error) {
        logger('error', `GET - API/transactions/${id}`)
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

        await Service.updateTransaction(
            id,
            {
                description,
                value,
                category,
                year,
                month,
                day,
                yearMonth,
                yearMonthDay,
                type,
            },
            { runValidators: true },
            err => {
                if (err) {
                    logger('error', `PUT - API/transactions/${id}`)
                    res.status(400)
                    next(err)
                }
            },
            response => {
                res.send(response)
                logger('info', `PUT - API/transactions/${id}`)
                logger('info', `Result:  ${JSON.stringify(response.object)}`)
            }
        )
    } catch (error) {
        logger('error', `PUT - API/transactions/${id}`)
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        await Service.deleteTransaction(
            id,
            null,
            err => {
                if (err) {
                    logger('error', `DELETE - API/transactions/${id}`)
                    res.status(400)
                    next(err)
                }
            },
            response => {
                res.send(response)
                logger('info', `DELETE - API/transactions/${id}`)
            }
        )
    } catch (error) {
        logger('error', `DELETE - API/transactions/${id}`)
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.delete('/', async (_, res, next) => {
    try {
        await Service.deleteAllTransactions(
            err => {
                if (err) {
                    logger('error', `DELETE - API/transactions/${id}`)
                    res.status(400)
                    next(err)
                }
            },
            response => {
                res.send(response)
                logger('info', `DELETE - API/transactions`)
            }
        )
    } catch (error) {
        logger('error', `DELETE - API/transactions`)
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
