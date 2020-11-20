import React, { useEffect, useState } from 'react'
import { periods } from '../../utils/periods.js'
import M from 'materialize-css'

export default function ({ onUse }) {
    const [disabled, setDisabled] = useState(true)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        M.AutoInit()
    }, [])

    useEffect(() => {
        if (inputValue === '') setDisabled(true)
    }, [inputValue])

    const handleSelectChange = ({ type, target: { value } }) =>
        onUse(type, value, 'yearMonth')

    const handleInputChange = ({ target: { value } }) => setInputValue(value)

    const handleSearch = ({ key, type }) =>
        key
            ? key === 'Enter'
                ? onUse(type, inputValue, 'filter')
                : setDisabled(false)
            : onUse(type, inputValue, 'filter')

    const handleSelectYearChange = ({ type, target: { value } }) => {
        onUse(type, value, 'year')
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
                            onChange={handleSelectChange}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a Period
                            </option>
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
                    <div className="input-field col s6 m6 l6">
                        <input
                            autoFocus={true}
                            value={inputValue}
                            onChange={handleInputChange}
                            type="text"
                            id="filterYay"
                            onKeyUp={handleSearch}
                        />
                        <label htmlFor="filterYay">Filtro:</label>
                    </div>
                    <div className="input-field col s2 m2 l2">
                        <button
                            formTarget="filterYay"
                            type="submit"
                            onClick={handleSearch}
                            id="searchButton"
                            disabled={disabled}
                            className="waves-effect waves-light btn"
                        >
                            <i className="material-icons right">search</i>
                            FILTRAR
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col s12 m12 l12">
                    <div className="input-field col s4 m4 l4">
                        <select
                            id="selector2Yay"
                            onChange={handleSelectYearChange}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a Year
                            </option>
                            {periods.years.map(year => {
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                )
                            })}
                        </select>
                        <label htmlFor="selector2Yay">Year</label>
                    </div>
                </div>
            </div>
        </>
    )
}
