import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react/cjs/react.development';

useColorBox.propTypes = {

};

function randomColor(typingColor) {
    const COLOR_LIST = ['green', 'blue', 'black', 'red']
    const indexColor = COLOR_LIST.findIndex(x => x === typingColor)
    let indexRandom
    do {
        indexRandom = Math.floor(Math.random() * COLOR_LIST.length)
    } while (indexColor === indexRandom)
    return COLOR_LIST[indexRandom]
}


function useColorBox(props) {

    const [color, setColor] = useState('transparent')
    const typingColor = useRef('transparent')
    useEffect(() => {
        const handelColorBox = setInterval(() => {
            const newColor = randomColor(typingColor.current)
            setColor(newColor)
            typingColor.current = newColor
            console.log(color);
        }, 1000)
        return () => {
            console.log(('ClearInterval Succceed'));
            clearInterval(handelColorBox)
        }
    }, [])
    return { color }
}

export default useColorBox;