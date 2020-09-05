const { getDataFromFile } = require('./src/utils/dataReader')
const { writeData } = require('./src/utils/dataWriter')
const { createCanvas, drawLine, drawRectangle, fillBucket, withBorders } = require('./src/utils/draw')

const INPUT_DATA_PATH = './src/data/input.txt'
const OUTPUT_DATA_PATH = './src/data/outputMy.txt'

const mapTypeByFunction = {
    'L': drawLine,
    'R': drawRectangle,
    'C': createCanvas,
    'B': fillBucket,
}

const convertToDrawFormat = command => Object.entries(command).reduce((acc, [k, v]) => {
    if (typeof v === 'number') {
        acc[k] = v - 1
    } else {
        acc[k] = v
    }
    return acc
}, {})

const commands = getDataFromFile(INPUT_DATA_PATH)

let canvas
let outputData = []

commands.forEach(({ type, ...command }) => {
    if (type === 'C') {
        canvas = mapTypeByFunction[type](command)
    } else {
        mapTypeByFunction[type](canvas)(convertToDrawFormat(command))
    }
    outputData.push(withBorders(JSON.parse(JSON.stringify(canvas)))) // deep clone
})

writeData(OUTPUT_DATA_PATH, outputData)
