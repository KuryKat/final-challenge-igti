import { db } from '../config/index.js'

const {
    logger,
    model,
    mongodb: { ObjectID },
} = db

/**
 * Default Callback tratament for mongoose operations
 * @param {Error} err
 * @param {import('mongoose').Document} product The Result Document
 */
const defaultCallback = (err, product) => {
    err
        ? logger('error', `There's the error: ${err.message}`)
        : logger('verbose', 'Callbacked! - DefaultCallback')
}

/**
 * Default Callback tratament for mongoose FIND operations
 * @param {Error} err
 * @param {Array<import('mongoose').Document>} product The results Documents Array
 */
const defaultFindCallback = (err, products) => {
    err
        ? logger('error', `There's the error: ${err.message}`)
        : logger('verbose', 'Callbacked! - DefaultFindCallback')
}

/**
 * Create ONE Transaction on Database
 * @param {{
 * description: String,
 * value: Number,
 * category: String,
 * year: Number,
 * month: Number,
 * day: Number,
 * yearMonth: String,
 * yearMonthDay: String,
 * type: String
 * }} transaction The transaction to create
 *
 * @param {Boolean} validate set to false to save without validating
 * @param {import('mongoose').SaveOptions} options optional options
 * @param callback optional callback
 */
const createTransaction = async (
    transaction,
    validate = true,
    options = {},
    callback = defaultCallback
) => {
    const newObject = new model(transaction)
    await newObject.save({ validateBeforeSave: validate, ...options }, callback)
    return { message: 'Transaction Created!', newObject }
}

/**
 * Retrieve One or more Transactions on Database
 * @param {import('mongoose').FilterQuery<T>} query The query for search, if not ... search for all documents
 * @param {Boolean} byID set to true to search by ID
 * @param {ObjectID} id if "byID" is true, give this ObjectID for make the search
 * @param callback optional callback
 * @return The results Array
 */
const retrieveTransaction = async (
    query = null,
    byID = false,
    id = null,
    callback = defaultFindCallback
) => {
    /**
     * The Results of Query
     * @type {Array<Document>}
     */
    let results = []

    query ?? (query = {})

    if (byID) {
        id ?? new Error('You need to specify the ID!')
        if (ObjectID.isValid(id)) results = await model.findById(id, callback)
        else throw new Error('Invalid ID! - "id" must be a ObjectID instance')

        return results
    } else {
        results = await model.find(query, callback)
    }

    const searchResult = { length: results.length, results }

    return searchResult
}

/**
 * Update One Transaction on Database
 * @param {ObjectID} id
 * @param {{
 * description: String,
 * value: Number,
 * category: String,
 * year: Number,
 * month: Number,
 * day: Number,
 * yearMonth: String,
 * yearMonthDay: String,
 * type: String
 * }} newObject
 */
const updateTransaction = async (id, newObject, callback = defaultCallback) => {
    id ?? new Error('You need to specify the ID!')
    if (ObjectID.isValid(id)) {
        const updatedObject = await model.findByIdAndUpdate(
            id,
            newObject,
            { new: true },
            callback
        )
        return { message: 'Successfully Updated!', updatedObject }
    } else throw new Error('Invalid ID! - "id" must be a ObjectID instance')
}

/**
 * Delete One Transaction on Database
 * @param {ObjectID} id
 */
const deleteTransaction = async (id, callback = defaultCallback) => {
    id ?? new Error('You need to specify the ID!')
    if (ObjectID.isValid(id)) await model.findByIdAndDelete(id, callback)
    else throw new Error('Invalid ID! - "id" must be a ObjectID instance')

    return { message: 'Successfully Deleted!' }
}

/**
 * WARNING: THIS IS THE MOST DANGEROUS METHOD!
 *
 * IT WILL DELETE ALL DATA FROM DATABASE!
 *
 * Just Use if you really know what are you doing!
 */
const deleteAllTransactions = async () => {
    logger('warn', `WARNING: All data from database will be DELETED!!`)
    logger(
        'warn',
        `WARNING: This is because you activated the "deleteAllTransactions" Method`
    )

    await model.deleteMany({})
    logger('warn', 'WARNING: All data deleted!')
    logger(
        'error',
        'YOUR DATABASE NOW HAVE NO DATA, PLEASE INSERT ANY DATA (or reload the default data) TO USE THE API!'
    )
}

export {
    createTransaction,
    retrieveTransaction,
    updateTransaction,
    deleteTransaction,
    deleteAllTransactions,
}
