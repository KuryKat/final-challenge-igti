import React, { useEffect, useState } from 'react'
import { leftPad } from '../../utils/leftPad.js'
import { format, formatDiñero } from '../../utils/formatNumber.js'
import Modal from './Modal/Modal.jsx'

export default function Transactions({ results, filtering }) {
    const globalLocale = 'pt-BR'
    const globalLocaleCurrency = 'BRL'
    const [total, setTotal] = useState(0)
    const [saldo, setSaldo] = useState(0)
    const [receitas, setReceitas] = useState(0)
    const [despesas, setDespesas] = useState(0)

    useEffect(() => {
        const fazerContinyas = () => {
            let total = 0
            let saldo = 0
            let receitas = 0
            let despesas = 0

            results.forEach(({ type, value }) => {
                total++
                if (type === '-') despesas += value
                if (type === '+') receitas += value
            })

            saldo = receitas - despesas
            setTotal(total)
            setSaldo(saldo)
            setReceitas(receitas)
            setDespesas(despesas)
        }
        fazerContinyas()
    }, [results])

    return (
        <>
            <hr />
            <div className="row">
                <div className="col s12 m12 l12">
                    <div className="col s4 m4 l4">
                        <a
                            disabled={filtering}
                            href="#modal1"
                            className="waves-effect waves-light btn modal-trigger center"
                        >
                            <i className="material-icons right tiny">add</i>
                            Adicionar Transação
                        </a>{' '}
                    </div>

                    <Modal type="create" />

                    <div className="col s8 m8 l8">
                        <span
                            style={{
                                marginTop: '10px',
                                padding: '10px',
                            }}
                        >
                            Quantidade: {format(globalLocale, total)}
                        </span>
                        <span
                            style={{
                                marginTop: '10px',
                                padding: '10px',
                            }}
                        >
                            Despesas:{' '}
                            {formatDiñero(
                                globalLocale,
                                globalLocaleCurrency,
                                despesas
                            )}
                        </span>
                        <span
                            style={{
                                marginTop: '10px',
                                padding: '10px',
                            }}
                        >
                            Receitas:{' '}
                            {formatDiñero(
                                globalLocale,
                                globalLocaleCurrency,
                                receitas
                            )}
                        </span>
                        <span
                            style={{
                                marginTop: '10px',
                                padding: '10px',
                            }}
                        >
                            Saldo:{' '}
                            {formatDiñero(
                                globalLocale,
                                globalLocaleCurrency,
                                saldo
                            )}
                        </span>
                    </div>
                </div>
            </div>
            <hr />
            <ul>
                {results.map(
                    ({
                        _id,
                        description,
                        value,
                        category,
                        year,
                        month,
                        day,
                        type,
                    }) => {
                        return (
                            <li style={{ padding: '10px' }} key={_id}>
                                {`${type}${formatDiñero(
                                    globalLocale,
                                    globalLocaleCurrency,
                                    value
                                )} - ${description} (${category}) -- ${leftPad(
                                    day
                                )}/${leftPad(month)}/${year}`}
                            </li>
                        )
                    }
                )}
            </ul>
        </>
    )
}
