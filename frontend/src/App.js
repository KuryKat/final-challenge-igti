import React, { useEffect } from 'react'

export default function App() {
    useEffect(() => {
        setTimeout(() => {
            document.title = 'FINAL CHALLENGE!'
        }, 900)
    }, [])

    return <h1>Desafio Final do Bootcamp Full Stack</h1>
}
