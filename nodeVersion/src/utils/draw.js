const getCanvasWidthHeight = canvas => ({
    width: canvas[0].length,
    height: canvas.length,
})

const checkIsCanvasHasPointConstructor = canvas => {
    const { width, height } = getCanvasWidthHeight(canvas)
    return ({ x, y }) => y >= 0 && x >= 0 && y < height && x < width
}


const createCanvas = ({ width, height }) => Array(height).fill(null).map(() => Array(width).fill(' '))

const drawLine = canvas => ({ x0, y0, x1, y1 }) => {
    const checkIsCanvasHasPoint = checkIsCanvasHasPointConstructor(canvas)
    for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
        for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
            if (checkIsCanvasHasPoint({ x, y })) {
                canvas[y][x] = 'x'
            }
        }
    }
}

const drawRectangle = canvas => ({ x0, y0, x1, y1 }) => {
    const drawLineOnCanvas = drawLine(canvas)
    drawLineOnCanvas({ x0, x1, y0, y1: y0 })
    drawLineOnCanvas({ x0: x1, x1, y0, y1 })
    drawLineOnCanvas({ x0, x1, y0: y1, y1 })
    drawLineOnCanvas({ x0, x1: x0, y0, y1 })
}

const fillBucket = canvas => {
    const checkIsCanvasHasPoint = checkIsCanvasHasPointConstructor(canvas)
    return (initialDot) => {
        let q = [initialDot]
        while (q.length) {
            const { x, y, c } = q[0]
            if (checkIsCanvasHasPoint({ x, y }) && canvas[y][x] === ' ') {
                canvas[y][x] = c
                q.push({ x: x + 1, y, c })
                q.push({ x: x - 1, y, c })
                q.push({ x, y: y + 1, c })
                q.push({ x, y: y - 1, c })
            }
            q.shift()
        }
    }
    // const recursiveFill = ({ x, y, c }) => {
    //     if (checkIsCanvasHasPoint({ x, y })) {
    //         const point = canvas[y][x]
    //         if (point === ' ') {
    //             canvas[y][x] = c
    //             recursiveFill({ x: x + 1, y, c })
    //             recursiveFill({ x: x - 1, y, c })
    //             recursiveFill({ x, y: y + 1, c })
    //             recursiveFill({ x, y: y - 1, c })
    //         }
    //     }
    // }
    // return recursiveFill
}

const withBorders = (canvas) => {
    const w = canvas[0].length
    const createHorLine = () => Array(w + 2).fill('-')
    return [
        createHorLine(),
        ...canvas.map(row => ['|', ...row, '|']),
        createHorLine(),
    ]
}

module.exports = {
    createCanvas,
    drawLine,
    drawRectangle,
    fillBucket,
    withBorders,
}
