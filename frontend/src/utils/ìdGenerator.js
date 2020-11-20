/**
 * Gera um ID aleatório combinando letras e números
 * @param {Number} lenginho quantidade de caracteres
 */
export const nameGen = lenginho => {
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < lenginho; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        )
    }
    return result
}
