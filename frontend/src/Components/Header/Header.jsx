import React, { useEffect, useState } from 'react'
import { periods } from '../../utils/periods.js'
import M from 'materialize-css'

export default function ({ onUse, isTiping }) {
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        M.AutoInit()
    }, [])

    const handleInputChange = ({ target: { value } }) => {
        if (value === '') isTiping(false)
        else isTiping(true)
        setInputValue(value)
        onUse(value, 'filter')
    }

    const handleSearch = ({ key, type, target: { id, value } }) => {
        if (periods.years.includes(value)) {
            onUse(value, 'year')
        } else {
            onUse(value, 'yearMonth')
        }
    }

    return (
        <>
            <header className="center">
                <h2>Fullstack Bootcamp - Final Challenge</h2>
                <h4>Controle Financeiro Pessoal!</h4>
            </header>

            <div className="row">
                <div className="col s12 m12 l12">
                    <div className="input-field col s4 m4 l4">
                        <select
                            id="selectorYay"
                            onChange={handleSearch}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a Period
                            </option>
                            {periods.years.map(year => {
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                )
                            })}
                            {periods.values.map(({ id, text, value }) => {
                                return (
                                    <option key={id} value={value}>
                                        {text}
                                    </option>
                                )
                            })}
                        </select>
                        <label htmlFor="selectorYay">Period</label>
                    </div>
                    <div className="input-field col s8 m8 l8">
                        <input
                            autoFocus={true}
                            value={inputValue}
                            onChange={handleInputChange}
                            type="text"
                            id="filterYay"
                        />
                        <label htmlFor="filterYay">Filtro:</label>
                    </div>
                </div>
            </div>
        </>
    )
}
