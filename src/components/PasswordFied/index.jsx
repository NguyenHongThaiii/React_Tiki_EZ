import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { name, label, disabled, form } = props;
  const { control } = form;
  const [showPassword, setShowPassword] = useState();
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <FormControl error={invalid} fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <OutlinedInput
            id={name}
            label={label}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            disabled={disabled}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default PasswordField;
