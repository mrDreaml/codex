import React, { useState } from 'react'
import * as draw from '../../utils/draw'
import { parseCommand } from '../../utils/commandParser'
import Canvas from '../Canvas'

const mapTypeByFunction = {
    'L': draw.drawLine,
    'R': draw.drawRectangle,
    'C': draw.createCanvas,
    'B': draw.fillBucket,
}

export default () => {
    const inputRef = React.createRef()
    const [canvas, updateCanvas] = useState(draw.createCanvas({ width: 5, height: 3 }))

    const onKeyDown = e => {
        if (e.key === 'Enter') {
            if (inputRef.current) {
                const parseResult = parseCommand(inputRef.current.value)
                if (parseResult) {
                    const { type, ...rest } = parseResult
                    if (type === 'C') {
                        updateCanvas(mapTypeByFunction[type](rest))
                    } else {
                        console.log(rest)
                        mapTypeByFunction[type](canvas)(rest)
                        updateCanvas(JSON.parse(JSON.stringify(canvas)))
                    }
                }
            }
        }
    }

    console.log(canvas)
    return (
        <div>
            <Canvas data={canvas} />
            <input ref={inputRef} placeholder={'Enter command'} onKeyDown={onKeyDown}/>
            <h2>Supports commands:</h2>
            <ul>
                <li>C w h</li>
                <li>L x0 y0 x1 y1</li>
                <li>R x0 y0 x1 y1</li>
                <li>B x y c</li>
            </ul>
        </div>
    )
}
