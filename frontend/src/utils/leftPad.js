/**
 * Escreve coisas à esquerda da string escolhida com base na quantidade de caracteres que ela tem e que serão adicionacdos
 * @param {String} value String à ser alterada
 * @param {Number} count Quantidade de caracteres desejados (Default = 2)
 * @param {String} char Caractere que será adicionado aos faltantes (Default = '0')
 */
export function leftPad(value, count = 2, char = '0') {
    value = value.toString()
    let newValue = value
    if (value.length < count) {
        newValue = ''
        for (let i = 0; i < count - value.length; i++) {
            newValue += `${char}`
        }
        newValue += value
    }
    return newValue
}
