import React from 'react'

export default function Modal({ type }) {
    if (type === 'create') {
        return (
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h1 className="center">Adicionar Transação</h1>
                    <div className="row">
                        <div className="col s12 m12 l12">
                            <div className="input-field col s6 m6 l6">
                                <input type="text" id="inputName" />
                                <label htmlFor="inputName">Nome</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="center">
                            <button
                                style={{
                                    border: '1px red solid',
                                    margin: '3px',
                                }}
                                className="modal-close center waves-effect waves-red btn-flat"
                            >
                                Cancelar
                            </button>
                            <button
                                style={{
                                    border: '1px green solid',
                                    margin: '3px',
                                }}
                                className="modal-close center waves-effect waves-green btn-flat"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (type === 'edit') {
    } else if (type === 'delete') {
    } else return <div>Você não especificou o tipo!</div>
}
