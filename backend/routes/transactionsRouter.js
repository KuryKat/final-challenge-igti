import { db } from '../config/index.js'
const {
    moment,
    logger,
    express: { Router },
} = db

import * as Service from '../services/transactionService.js'

const router = Router()
const invalidYear = 'Ano incorreto - O ano deve estar no formato YYYY'
const invalidPeriod =
    'Período incorreto - O período deve estar no formato YYYY-MM'

/**
 * Default Info Logger for endpoints
 * @param {import('express').Request} req
 */
const defaultLogger = ({ method, originalUrl }) =>
    logger('info', `${method} - ${originalUrl}`)

/**
 * Default Error Logger for endpoints
 * @param {import('express').Request} req
 */
const errorLogger = ({ method, originalUrl }) =>
    logger('error', `${method} - ${originalUrl}`)

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
                    errorLogger(req)
                    res.status(400)
                    next(err)
                }
            },
            response => {
                res.send(response)
                defaultLogger(req)
            }
        )
    } catch (error) {
        errorLogger(req)
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    const { period, year } = req.query
    try {
        if (!year) {
            if (!moment(period, 'YYYY-MM', true).isValid())
                throw new Error(invalidPeriod)
            await Service.retrieveTransaction(
                {
                    yearMonth: { $regex: new RegExp(period, 'i') },
                },
                null,
                null,
                err => {
                    if (err) {
                        errorLogger(req)
                        res.status(400)
                        next(err)
                    }
                },
                response => {
                    res.send(response)
                    defaultLogger(req)
                }
            )
        } else if (!period) {
            if (!moment(year, 'YYYY', true).isValid())
                throw new Error(invalidYear)
            await Service.retrieveTransaction(
                {
                    year: year,
                },
                null,
                null,
                err => {
                    if (err) {
                        errorLogger(req)
                        res.status(400)
                        next(err)
                    }
                },
                response => {
                    res.send(response)
                    defaultLogger(req)
                }
            )
        } else {
            throw new Error(
                'You dont specified the period or the year (or you used both)'
            )
        }
    } catch (error) {
        errorLogger(req)
        if (error.name === 'Error') res.status(400)
        next(error)
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
                    errorLogger(req)
                    res.status(400)
                    next(err)
                }
            },
            response => {
                res.send(response)
                defaultLogger(req)
            }
        )
    } catch (error) {
        errorLogger(req)
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
                    errorLogger(req)
                    res.status(400)
                    next(err)
                }
            },
            response => {
                res.send(response)
                defaultLogger(req)
            }
        )
    } catch (error) {
        errorLogger(req)
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
                    errorLogger(req)
                    res.status(400)
                    next(err)
                }
            },
            response => {
                res.send(response)
                defaultLogger(req)
            }
        )
    } catch (error) {
        errorLogger(req)
        if (error.name === 'Error') res.status(400)
        next(error)
    }
})

router.delete('/', async (req, res, next) => {
    try {
        await Service.deleteAllTransactions(
            err => {
                if (err) {
                    errorLogger(req)
                    res.status(400)
                    next(err)
                }
            },
            response => {
                res.send(response)
                defaultLogger(req)
            }
        )
    } catch (error) {
        errorLogger(req)
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
