import axios from 'axios'

const http = axios.create({
    // proxy: true,
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-type': 'application/json',
    },
})

/**
 * A Transaction Object
 * @typedef {Object} Transaction
 * @property {String} description The Transaction Description
 * @property {Number} value The Transaction value
 * @property {String} category The Transaction category
 * @property {Number} year The Transaction year
 * @property {Number} month The Transaction month
 * @property {Number} day The Transaction day
 * @property {String} yearMonth The Transaction "yearMonth" string (format: yyyy-mm)
 * @property {String} yearMonthDay The Transaction "yearMonthDay" string (format: yyyy-mm-dd)
 * @property {String} type The Transaction type ("+" | "-")
 */

/**
 * Creates a new Transaction on Database
 * @param {Transaction} data
 */
const create = data => http.post('/api/transactions', data)

/**
 * Retrieve a Transaction by ID
 * @param {import('mongodb').ObjectID} id
 */
const getByID = id => http.get(`/api/transactions/${id}`)

/**
 * Retrieve all Transactions by Period
 * @param {Transaction['yearMonth']} period (format: yyyy-mm)
 */
const getByPeriod = period => http.get(`/api/transactions?period=${period}`)

/**
 * Retrieve all Transactions by Description
 * @param {Transaction['description']} description
 */
const getByDescription = description =>
    http.get(`/api/transactions?desc=${description}`)

/**
 * Retrieve all Transactions by Year
 * @param {Transaction['yearMonth']} period (format: yyyy-mm)
 * @param {Transaction['description']} description
 */
const getByYear = year => http.get(`/api/transactions?year=${year}`)

/**
 * Retrieve all Transactions by Period && Description
 * @param {Transaction['yearMonth']} period (format: yyyy-mm)
 * @param {Transaction['description']} description
 */
const getByBoth = (description, period) =>
    http.get(`/api/transactions?period=${period}&desc=${description}`)

/**
 * Update a Transaction on Database
 * @param {import('mongodb').ObjectID} id
 * @param {Transaction} data
 */
const update = (id, data) => http.put(`/api/transactions/${id}`, data)

/**
 * Delete a Transaction on Database by ID
 * @param {import('mongodb').ObjectID} id
 */
const remove = id => http.delete(`/api/transactions/${id}`)

export {
    create,
    getByID,
    getByPeriod,
    getByDescription,
    getByYear,
    getByBoth,
    update,
    remove,
}
