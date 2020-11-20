import React, { useEffect, useState } from 'react'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Transactions from './Components/Transactions/Transactions'
import {
    getByBoth,
    getByYear,
    getByDescription,
    getByPeriod,
} from './services/TransactionService.js'

import util from 'lodash'

/**
 * @type {import('./services/TransactionService.js').Transaction[]}
 */
const TransactionArray = []

/**
 * @type {import('./services/TransactionService.js').Transaction['yearMonth']}
 */
const TransactionYearMonth = 'xxxx'

/**
 * @type {import('./services/TransactionService.js').Transaction['description']}
 */
const TransactionDescription = ''

/**
 * @type {import('./services/TransactionService.js').Transaction['year']}
 */
const TransactionYear = 0

export default function App() {
    useEffect(() => {
        setTimeout(() => {
            document.title = 'FINAL CHALLENGE!'
        }, 900)
    }, [])

    const [results, setResults] = useState(TransactionArray)
    const [descSearch, setDescSearch] = useState(TransactionDescription)
    const [period, setPeriod] = useState(TransactionYearMonth)
    const [year, setYear] = useState(TransactionYear)

    useEffect(() => {
        ;(async () => {
            descSearch !== '' && period !== 'xxxx'
                ? setResults((await getByBoth(descSearch, period)).data.results)
                : descSearch !== ''
                ? setResults((await getByDescription(descSearch)).data.results)
                : period !== 'xxxx'
                ? setResults((await getByPeriod(period)).data.results)
                : year !== 0
                ? setResults((await getByYear(year)).data.results)
                : setResults([])
        })()
    }, [period, descSearch, year])

    const handleHeader = (type, value, search) => {
        type === 'change' && search === 'yearMonth'
            ? setPeriod(value)
            : type === 'change' && search === 'year'
            ? setYear(value)
            : type === 'keyup' && search === 'filter'
            ? setDescSearch(value)
            : type === 'click' && search === 'filter'
            ? setDescSearch(value)
            : console.log('Não sei como chegou aqui :P')
    }

    return (
        <>
            <div className="container">
                <Header onUse={util.debounce(handleHeader, 800)} />

                <Transactions results={results} />

                <Footer />
            </div>
        </>
    )
}
