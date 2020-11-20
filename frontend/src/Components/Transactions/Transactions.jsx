import React from 'react'
import { leftPad } from '../../utils/leftPad.js'
import { format, formatDiñero } from '../../utils/formatNumber.js'
import Modal from './Modal/Modal.jsx'

export default function Transactions({ results, filtering }) {
    const globalLocale = 'pt-BR'
    const globalLocaleCurrency = 'BRL'

    const receitas = results.filter(result => result.type !== '-')
    const despesas = results.filter(result => result.type !== '+')
    const receitasTotal = receitas.reduce((acc, curr) => acc + curr.value, 0)
    const despesasTotal = despesas.reduce((acc, curr) => acc + curr.value, 0)

    const saldo = receitasTotal - despesasTotal

    const { length } = results

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

                    <Modal />

                    <div className="col s8 m8 l8">
                        <span style={{ marginTop: '10px', padding: '10px' }}>
                            Quantidade: {format(globalLocale, length)}
                        </span>
                        <span style={{ marginTop: '10px', padding: '10px' }}>
                            Despesas:{' '}
                            {formatDiñero(
                                globalLocale,
                                globalLocaleCurrency,
                                despesasTotal
                            )}
                        </span>
                        <span style={{ marginTop: '10px', padding: '10px' }}>
                            Receitas:{' '}
                            {formatDiñero(
                                globalLocale,
                                globalLocaleCurrency,
                                receitasTotal
                            )}
                        </span>
                        <span style={{ marginTop: '10px', padding: '10px' }}>
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
