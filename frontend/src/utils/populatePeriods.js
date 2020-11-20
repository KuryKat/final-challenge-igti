import { writeFile } from 'fs/promises'
import { leftPad } from './leftPad.js'
import { nameGen } from './ìdGenerator.js'

const years = Array.from({ length: 3 })
years[0] = 2019
years[1] = 2020
years[2] = 2021

const months = Array.from({ length: 12 })
months[0] = 'jan'
months[1] = 'fev'
months[2] = 'mar'
months[3] = 'abr'
months[4] = 'mai'
months[5] = 'jun'
months[6] = 'jul'
months[7] = 'ago'
months[8] = 'set'
months[9] = 'out'
months[10] = 'nov'
months[11] = 'dez'

const data = []
const bigBoye = {}
bigBoye['years'] = [2019, 2020, 2021]

years.forEach(year => {
    months.forEach((month, index) => {
        data.push({
            text: `${month}/${year}`,
            value: `${year}-${leftPad(index + 1)}`,
            id: nameGen(4),
        })
    })
})

bigBoye['values'] = data

writeFile(
    './periods.js',
    `export const periods = ${JSON.stringify(bigBoye, null, 4)}`
).then(console.log('Done!'))
