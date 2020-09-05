const fs = require('fs')

const REGULAR_GROUPS_RULES = [
    /(?<type>C)\s(?<width>[0-9]+)\s(?<height>[0-9]+)$/,
    /(?<type>L)\s(?<x0>[0-9]+)\s(?<y0>[0-9]+)\s(?<x1>[0-9]+)\s(?<y1>[0-9]+)$/,
    /(?<type>R)\s(?<x0>[0-9]+)\s(?<y0>[0-9]+)\s(?<x1>[0-9]+)\s(?<y1>[0-9]+)$/,
    /(?<type>B)\s(?<x>[0-9]+)\s(?<y>[0-9]+)\s(?<c>[A-z]+)$/,
]

const searchRegExp = command => REGULAR_GROUPS_RULES.find(regExp => regExp.test(command.trim()))

const tryToParseInt = value => {
    const numberValue = parseInt(value)
    if (numberValue.toString().length !== value.length) {
        return value
    }
    return numberValue
}

const getDataFromFile = filePath => {
    const inputFile = fs.readFileSync(filePath, 'utf8')
    const lines = inputFile.split('\n')
    return lines.map(line => {
        const regExp = searchRegExp(line)
        if (regExp) {
            const { groups } = line.match(regExp)
            return Object.entries(groups).reduce((acc, [k, v]) => {
                acc[k] = tryToParseInt(v)
                return acc
            }, {})
        }
    })
}

module.exports = { getDataFromFile }
