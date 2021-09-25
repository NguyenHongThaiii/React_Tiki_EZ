import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { name, label, disabled, form } = props;
  const { control } = form;
  return (
    <Controller
      control={control}
      name={name}
      // render={({ field:{ onChange, value} }) => <Switch onChange={onChange} checked={value} />}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          label={label}
          value={value}
          disabled={disabled}
          error={invalid}
          helperText={error?.message}
        />
      )}
    />
  );
}

export default InputField;
