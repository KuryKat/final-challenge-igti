import React from 'react'

export default function Modal() {
    return (
        <div id="modal1" className="modal">
            <div className="modal-content">
                <h1 className="center">Adicionar Transação</h1>
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
    )
}
