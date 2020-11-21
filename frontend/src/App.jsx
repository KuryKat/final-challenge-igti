import React, { useEffect, useState } from 'react'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Transactions from './Components/Transactions/Transactions'
import { getByPeriod, getByYear } from './services/TransactionService.js'

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
    const [filteredResults, setFilteredResults] = useState(TransactionArray)
    const [descSearch, setDescSearch] = useState(TransactionDescription)
    const [period, setPeriod] = useState(TransactionYearMonth)
    const [year, setYear] = useState(TransactionYear)
    const [filtering, setfiltering] = useState(false)

    useEffect(() => {
        ;(async () => {
            period !== 'xxxx'
                ? setResults((await getByPeriod(period)).data.results)
                : year !== 0
                ? setResults((await getByYear(year)).data.results)
                : console.log('Site Carregado!')
        })()
    }, [period, year])

    useEffect(() => {
        const setNewResults = () => {
            if (descSearch.length > 0) {
                const filteredArray = results.filter(result =>
                    new RegExp(descSearch, 'i').test(result.description)
                )
                setFilteredResults(filteredArray)
            } else setFilteredResults(results)
        }

        setNewResults()
    }, [descSearch, results])

    const handleHeader = (value, type) => {
        if (type === 'filter') setDescSearch(value)
        else if (type === 'year') setYear(value)
        else if (type === 'yearMonth') setPeriod(value)
    }

    return (
        <>
            <div className="container">
                <Header
                    isTiping={setfiltering}
                    onUse={util.debounce(handleHeader, 500)}
                />

                <Transactions filtering={filtering} results={filteredResults} />

                <Footer />
            </div>
        </>
    )
}
