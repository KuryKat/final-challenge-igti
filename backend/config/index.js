import mongoose from 'mongoose'
import mongodb from 'mongodb'
import express from 'express'
import moment from 'moment'

import { TransactionModel } from '../models/TransactionModel.js'
import { logger as logg } from '../utils/logger/index.js'

const values = {}
values.mongoose = mongoose
values.express = express
values.moment = moment
values.mongodb = mongodb

values.model = TransactionModel
values.logger = logg

export { values as db }
