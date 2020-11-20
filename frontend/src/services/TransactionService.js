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

/**
 * Get transactions from database
 * @param {string} period
 * @param {string} description
 * @param {string} year
 */
const getBy = (period, description, year) => {
    try {
        if (!period && !year) {
            return http.get(`/api/transactions?desc=${description}`)
        } else if (!description && !year) {
            return http.get(`/api/transactions?period=${period}`)
        } else if (!description && !period) {
            return http.get(`/api/transactions?year=${year}`)
        } else if (!year) {
            return http.get(
                `/api/transactions?desc=${description}&period=${period}`
            )
        } else if (!period) {
            return http.get(
                `/api/transactions?desc=${description}&year=${year}`
            )
        } else if (!description) {
            return http.get(`/api/transactions?year=${year}&period=${period}`)
        } else {
            return http.get(
                `/api/transactions?year=${year}&period=${period}&desc=${description}`
            )
        }
    } catch (error) {
        console.log(error)
    }
}

export { create, getByID, update, remove, getBy }
