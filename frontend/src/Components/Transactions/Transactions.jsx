import { leftPad } from '../../utils/leftPad.js'
import React from 'react'
import util from 'lodash'
import { format, formatDiñero } from '../../utils/formatNumber.js'

export default function Transactions({ results }) {
    const globalLocale = 'pt-BR'
    const globalLocaleCurrency = 'BRL'

    const receitas = results.filter(result => result.type !== '-')
    const despesas = results.filter(result => result.type !== '+')
    const receitasTotal = receitas.reduce((acc, curr) => acc + curr.value, 0)
    const despesasTotal = despesas.reduce((acc, curr) => acc + curr.value, 0)

    const saldo = receitasTotal - despesasTotal

    const { length } = results

    const handleClick = e => {
        return alert('KKKKKKKKKKKKKKKKKKKKKKKK GAY')
    }

    return (
        <>
            <hr />
            <div className="row">
                <div className="col s12 m12 l12">
                    <div className="col s4 m4 l4">
                        <button
                            onClick={util.debounce(handleClick, 800)}
                            className="center waves-effect waves-light btn"
                        >
                            <i className="material-icons right tiny">add</i>
                            Adicionar Transação
                        </button>{' '}
                    </div>
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
                        yearMonth,
                        yearMonthDay,
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
