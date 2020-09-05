const fs = require('fs')

const convertToOutputFormat = data => data.reduce((acc, canvas, stepId) => {
    acc += `Step: ${stepId + 1}\n`
    let res = ''
    canvas.forEach(rows => {
        rows.forEach(value => {
            res += value
        })
        res += '\n'
    })
    return acc += res + '\n\n'
}, '')

const writeData = (filePath, outputData) => {
    fs.writeFile(filePath, convertToOutputFormat(outputData), (err) => {
        if (err) return console.log(err)
        console.log(`File ${filePath} has saved successfully`)
    })
}

module.exports = {
    writeData,
}
