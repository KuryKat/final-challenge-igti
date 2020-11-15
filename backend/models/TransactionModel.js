import mongoose from 'mongoose'
const { Schema, model } = mongoose
import moment from 'moment'

export const TransactionModel = model(
    'transaction',
    Schema({
        description: {
            type: String,
            required: [true, 'Description is required! (String)'],
            minlength: [1, 'Minimum length of Description is one'],
        },
        value: {
            type: Number,
            required: [true, 'Value is required! (Number)'],
            min: [0, 'Minimum value is zero'],
        },
        category: {
            type: String,
            required: [true, 'Category is required! (String)'],
            minlength: [1, 'Minimum length of Category is one'],
        },
        year: {
            type: Number,
            required: [true, 'Year is required! (Number)'],
            validate: {
                validator: v => moment(v, 'YYYY', true).isValid(),
                message: props =>
                    `'${props.value}' is not a valid year or year format!`,
            },
        },
        month: {
            type: Number,
            required: [true, 'Month is required! (Number)'],
            validate: {
                validator: v => moment(v, 'M', true).isValid(),
                message: props =>
                    `'${props.value}' is not a valid month or month format`,
            },
        },
        day: {
            type: Number,
            required: [true, 'Day is required! (Number)'],
            validate: {
                validator: v => moment(v, 'D', true).isValid(),
                message: props =>
                    `'${props.value}' is not a valid day or day format`,
            },
        },
        yearMonth: {
            type: String,
            required: [true, 'yearMonth is required! (String)'],
            validate: {
                validator: v => moment(v, 'YYYY-MM', true).isValid(),
                message: props =>
                    `'${props.value}' is not a valid yearMonth format (YYYY-MM)`,
            },
        },
        yearMonthDay: {
            type: String,
            required: [true, 'yearMonthDay is required! (String)'],
            validate: {
                validator: v => moment(v, 'YYYY-MM-DD', true).isValid(),
                message: props =>
                    `'${props.value}' is not a valid yearMonthDay format (YYYY-MM-DD)`,
            },
        },
        type: {
            type: String,
            required: [true, 'type is required! (String)'],
            minlength: [1, 'Minimum length of type is one'],
            maxlength: [1, 'Maximum length of type is one'],
            validate: {
                validator: v => /^\+$|^-$/.test(v),
                message: props =>
                    `'${props.value}' is not a valid type [Types: '+' || '-']`,
            },
        },
        lastModified: {
            type: Date,
            required: true,
            default: new Date(),
        },
    }),
    'transactions'
)
