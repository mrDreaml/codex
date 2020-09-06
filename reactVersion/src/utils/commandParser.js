const REGULAR_GROUPS_RULES = [
    /(?<type>C)\s(?<width>[0-9]+)\s(?<height>[0-9]+)$/,
    /(?<type>L)\s(?<x0>[0-9]+)\s(?<y0>[0-9]+)\s(?<x1>[0-9]+)\s(?<y1>[0-9]+)$/,
    /(?<type>R)\s(?<x0>[0-9]+)\s(?<y0>[0-9]+)\s(?<x1>[0-9]+)\s(?<y1>[0-9]+)$/,
    /(?<type>B)\s(?<x>[0-9]+)\s(?<y>[0-9]+)\s(?<c>[A-z]+)$/,
]

const searchRegExp = command => REGULAR_GROUPS_RULES.find(regExp => regExp.test(command.trim()))

const tryToParseInt = value => {
    const numberValue = parseInt(value)
    if (isNaN(numberValue) || numberValue.toString().length !== value.length) {
        return value
    }
    return numberValue
}


export const parseCommand = command => {
    const regExp = searchRegExp(command)
    if (regExp) {
        const { groups } = command.match(regExp)
        return Object.entries(groups).reduce((acc, [k, v]) => {
            acc[k] = tryToParseInt(v)
            return acc
        }, {})
    }
}
