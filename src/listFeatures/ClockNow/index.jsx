import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react/cjs/react.development';

CLockNow.propTypes = {

};
function formatDate(date) {
    const hours = `0${date.getHours()}`.slice(-2)
    const minutes = `0${date.getMinutes()}`.slice(-2)
    const seconds = `0${date.getSeconds()}`.slice(-2)
    return `${hours}:${minutes}:${seconds}`
}
function CLockNow(props) {
    const [timeString, setTimeString] = useState('')
    useEffect(() => {
        const TimeNow = setInterval(() => {
            const date = new Date()
            const newTimeString = formatDate(date)
            setTimeString(newTimeString)
        }, 1000)
        return () => {
            console.log('Clean Up Succesfully');
            clearInterval(TimeNow)
        }
    }, [])
    return (
        <div>
            <p style={{ fontSize: '40px' }}>{timeString}</p>
        </div>
    );
}

export default CLockNow;