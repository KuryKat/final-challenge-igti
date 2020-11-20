/**
 * Formata um número no padrão nacional especificado
 * @param {String} locale
 * @param {Number} value
 */
export const format = (locale, value) => Intl.NumberFormat(locale).format(value)

/**
 * Formata um número no padrão monetário especificado
 * @param {String} locale
 * @param {String} localeCurrency
 * @param {Number} value
 */
export const formatDiñero = (locale, localeCurrency, value) =>
    Intl.NumberFormat(locale, {
        style: 'currency',
        currency: localeCurrency,
    }).format(value)
