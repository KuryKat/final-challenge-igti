import { db } from '../config/index.js'

const {
    logger,
    model,
    mongodb: { ObjectID },
} = db

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
 * Default Message for Invalid ID return
 * @type {String}
 */
const invalidID = 'Invalid ID! It needs to be a valid ObjectID'

/**
 * Default Message for undefined Document return
 * @type {String}
 */
const undefinedDocument = 'This Document does not exist!'

/**
 * Default Message for undefined ID return
 * @type {String}
 */
const undefinedID = 'You need to specify the ID!'

/**
 * Default Callback tratament for error handling
 * @param {Error} err
 * @return {void}
 */
const defaultErrorCallback = err => {
    err
        ? logger('error', `CALLBACK: There's the error: ${err.message}`)
        : logger('verbose', 'Callbacked! - DefaultCallback')
}

/**
 * @param {{message: String, object: Document}} response The response
 * @return {void}
 */
const transactionCallback = response => {}

/**
 * Create ONE Transaction on Database
 * @param {Transaction} transaction The transaction to create
 * @param {import('mongoose').SaveOptions} options optional options
 * @param errorCallback Callback for Errors Handling
 * @param response Callback that receive the response Object
 * @return response execution
 */
const createTransaction = async (
    transaction,
    options = null,
    errorCallback = defaultErrorCallback,
    response = transactionCallback
) => {
    const newObject = new model(transaction)
    options ?? (options = {})
    await newObject.save({ ...options }, errorCallback)
    return response({
        message: `Successfully Created Document: ${newObject._id}`,
        newObject,
    })
}

/**
 * Retrieve One or more Transactions on Database
 * @param {import('mongoose').FilterQuery<T>} query The search query, if not used, searches all documents
 * @param {Boolean} byID Set to true to search by ID
 * @param {ObjectID} id if "byID" is true, give this ObjectID for make the search
 * @param errorCallback Callback for Errors Handling
 * @param response Callback that receive the response Object
 * @return response execution
 */
const retrieveTransaction = async (
    query = null,
    byID = null,
    id = null,
    errorCallback = defaultErrorCallback,
    response = transactionCallback
) => {
    byID ?? (byID = false)
    if (byID) {
        /**
         * The search result
         * @type {Document}
         */
        let result = {}
        id ?? new SyntaxError(undefinedID)
        if (ObjectID.isValid(id))
            result = await model.findById(id, errorCallback)
        else throw new Error(invalidID)
        if (!result) throw new Error(undefinedDocument)
        return response({ message: 'Ok', result })
    } else {
        /**
         * The Results of Query
         * @type {Array<Document>}
         */
        let results = []
        query ?? (query = {})
        results = await model.find(query, errorCallback)
        if (!results) throw new Error(undefinedDocument)
        return response({ length: results.length, results })
    }
}

/**
 * Update One Transaction on Database
 * @param {ObjectID} id
 * @param {Transaction} newObject
 * @param {import('mongoose').QueryFindOneAndUpdateOptions} options optional options
 * @param errorCallback Callback for Errors Handling
 * @param response Callback that receive the response Object
 * @return response execution
 */
const updateTransaction = async (
    id,
    newObject,
    options = null,
    errorCallback = defaultErrorCallback,
    response = transactionCallback
) => {
    id ?? new SyntaxError(undefinedID)
    if (ObjectID.isValid(id)) {
        const search = await model.findById(id)
        if (!search) throw new Error(undefinedDocument)
        options ?? (options = {})
        const updatedObject = await model.findByIdAndUpdate(
            search,
            newObject,
            { new: true, ...options },
            errorCallback
        )

        return response({
            message: `Successfully Updated Document: ${id}`,
            updatedObject,
        })
    } else throw new Error(invalidID)
}

/**
 * Delete One Transaction on Database
 * @param {ObjectID} id
 * @param {import('mongoose').QueryFindOneAndRemoveOptions} options
 * @param errorCallback Callback for Errors Handling
 * @param response Callback that receive the response Object
 * @return response execution
 */
const deleteTransaction = async (
    id,
    options = null,
    errorCallback = defaultErrorCallback,
    response = transactionCallback
) => {
    id ?? new SyntaxError(undefinedID)
    if (ObjectID.isValid(id)) {
        const search = await model.findById(id)
        if (!search) throw new Error(undefinedDocument)
        options ?? (options = {})
        await model.findByIdAndDelete(id, options, errorCallback)
        return response({
            message: `Successfully Deleted Document: ${id}`,
            deletedDocument: search,
        })
    } else throw new Error(invalidID)
}

/**
 * ! WARNING: THIS IS THE MOST DANGEROUS METHOD!
 *
 * ! IT WILL DELETE ALL DATA FROM DATABASE!
 *
 * * Just Use if you really know what are you doing!
 *
 * @param errorCallback Callback for Errors Handling
 * @param response Callback that receive the response Object
 */
const deleteAllTransactions = async (
    errorCallback = defaultErrorCallback,
    response = transactionCallback
) => {
    logger('warn', `WARNING: All data from database will be DELETED!!`)
    logger(
        'warn',
        `WARNING: This is because you activated the "deleteAllTransactions" Method`
    )

    logger('warn', 'WARNING: All data deleted!')
    logger(
        'error',
        'YOUR DATABASE NOW HAVE NO DATA, PLEASE INSERT ANY DATA (or reload the default data) TO USE THE API!'
    )
    await model.deleteMany({}, errorCallback)
    return response({
        message: 'Deleted All database!',
        ok: retrieveTransaction(),
    })
}

export {
    createTransaction,
    retrieveTransaction,
    updateTransaction,
    deleteTransaction,
    deleteAllTransactions,
}
