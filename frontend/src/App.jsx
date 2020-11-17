import React from 'react'
import { useEffect, useState } from 'react'
import { getAll } from './services/TransactionService.js'

export default function App() {
    useEffect(() => {
        setTimeout(() => {
            document.title = 'FINAL CHALLENGE!'
        }, 900)
    }, [])

    const [length, setLength] = useState(0)

    getAll().then(response => {
        return setLength(response.data.length)
    })

    return (
        <>
            <header>
                <h3>Fullstack Bootcamp - Final Challenge</h3>
            </header>

            <h4>{length}</h4>

            <footer>
                Fullstack Developer Bootcamp, provided by{' '}
                <a href="https://igti.com.br">IGTI</a>
            </footer>
        </>
    )
}
