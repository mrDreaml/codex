const getCanvasWidthHeight = canvas => ({
    width: canvas[0].length,
    height: canvas.length,
})

const checkIsCanvasHasPointConstructor = canvas => {
    const { width, height } = getCanvasWidthHeight(canvas)
    return ({ x, y }) => y >= 0 && x >= 0 && y < height && x < width
}

const EMPTY_CELL = {
    color: '#999',
}

const BORDER_CELL = {
    color: '#333',
}

const createFilledCell = (color) => ({
    color,
})

export const createCanvas = ({ width, height }) => Array(height).fill(null).map(() => Array(width).fill(EMPTY_CELL))

export const drawLine = canvas => ({ x0, y0, x1, y1 }) => {
    const checkIsCanvasHasPoint = checkIsCanvasHasPointConstructor(canvas)
    for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
        for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
            if (checkIsCanvasHasPoint({ x, y })) {
                canvas[y][x] = BORDER_CELL
            }
        }
    }
}

export const drawRectangle = canvas => ({ x0, y0, x1, y1 }) => {
    const drawLineOnCanvas = drawLine(canvas)
    drawLineOnCanvas({ x0, x1, y0, y1: y0 })
    drawLineOnCanvas({ x0: x1, x1, y0, y1 })
    drawLineOnCanvas({ x0, x1, y0: y1, y1 })
    drawLineOnCanvas({ x0, x1: x0, y0, y1 })
}

export const fillBucket = canvas => {
    const checkIsCanvasHasPoint = checkIsCanvasHasPointConstructor(canvas)
    const recursiveFill = ({ x, y, c }) => {
        if (checkIsCanvasHasPoint({ x, y })) {
            const point = canvas[y][x]
            if (point && point.color !== BORDER_CELL.color) {
                canvas[y][x] = createFilledCell(c)
                recursiveFill({ x: x + 1, y, c })
                recursiveFill({ x: x - 1, y, c })
                recursiveFill({ x, y: y + 1, c })
                recursiveFill({ x, y: y - 1, c })
            }
        }
    }
    return recursiveFill
}

