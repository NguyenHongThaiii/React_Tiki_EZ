import React from 'react';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react/cjs/react.development';

FormPostList.propTypes = {
  onSubmit: PropTypes.func,
};
FormPostList.defaultProps = {
  onSubmit: null,
};

function FormPostList(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState('');
  const typingRef = useRef(null);
  const handelChangeValue = (e) => {
    const valueInput = e.target.value;

    setValue(valueInput);
    if (!onSubmit) return;
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    typingRef.current = setTimeout(() => {
      const formData = {
        title: valueInput,
      };
      onSubmit(formData);
    }, 300);
  };
  function handelOnSumit(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handelOnSumit}>
      <input type="text" value={value} onChange={handelChangeValue} />
    </form>
  );
}

export default FormPostList;
