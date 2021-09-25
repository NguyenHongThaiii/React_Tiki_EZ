import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};
TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {
    const { onSubmit } = props
    const [value, setValue] = useState('')
    function HandelValueChange(e) {
        setValue(e.target.value)
    }
    function HandelFormSumit(e) {
        e.preventDefault()
        if (!onSubmit) return;

        const formData = {
            title: value
        }
        onSubmit(formData)
        setValue('')
    }
    return (
        <form onSubmit={HandelFormSumit}>
            <input type="text" value={value} onChange={HandelValueChange} />
        </form>
    );
}

export default TodoForm;