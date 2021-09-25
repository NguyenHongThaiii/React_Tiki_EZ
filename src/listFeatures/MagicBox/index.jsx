import React from 'react';
import PropTypes from 'prop-types';
import useColorBox from '../ColorBox';
import './index.css'
MagicBox.propTypes = {

};

function MagicBox(props) {
    const { color } = useColorBox()
    return (
        <div style={{ backgroundColor: color }}>
        </div>
    );
}

export default MagicBox;