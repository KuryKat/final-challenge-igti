import React, { useEffect, useState } from 'react'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Transactions from './Components/Transactions/Transactions'
import { getBy } from './services/TransactionService.js'

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
    const [filtering, setfiltering] = useState(TransactionYear)

    useEffect(() => {
        ;(async () => {
            descSearch !== '' && period !== 'xxxx'
                ? setResults((await getBy(period, descSearch)).data.results)
                : descSearch !== ''
                ? setResults((await getBy(null, descSearch)).data.results)
                : period !== 'xxxx'
                ? setResults((await getBy(period)).data.results)
                : year !== 0
                ? setResults((await getBy(null, null, year)).data.results)
                : setResults([])
        })()
    }, [period, descSearch, year])

    const handleHeader = (type, value, search) => {
        if (type === 'change' && search === 'yearMonth') setPeriod(value)
        else if (type === 'change' && search === 'year') setYear(value)
        else if (type === 'keyup' && search === 'filter') setDescSearch(value)
        else if (type === 'click' && search === 'filter') setDescSearch(value)
        else if (search === 'clean') setfiltering(false)
        else setfiltering(true)
    }

    return (
        <>
            <div className="container">
                <Header onUse={util.debounce(handleHeader, 500)} />

                <Transactions filtering={filtering} results={results} />

                <Footer />
            </div>
        </>
    )
}
