import { FormHelperText, IconButton, Typography, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import RemoveCircleOutlineTwoToneIcon from '@mui/icons-material/RemoveCircleOutlineTwoTone';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex_flow: 'row nowrap',
    alignItems: 'center',

    maxWidth: '200px',
  },
}));
function QuantityField(props) {
  const classes = useStyle();
  const { name, label, disabled, form } = props;
  const { control, setValue } = form;
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <FormControl fullWidth size="small" error={invalid} margin="normal" variant="outlined">
          <Typography htmlFor={name}>{label}</Typography>
          <Box className={classes.root}>
            <IconButton
              disabled={Number.parseInt(value) <= 1}
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)
              }
            >
              <RemoveCircleOutlineTwoToneIcon />
            </IconButton>
            <OutlinedInput
              id={name}
              type="number"
              value={value < 100000 ? value : 1}
              onBlur={onBlur}
              onChange={onChange}
              disbled={disabled}
            />
            <IconButton
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
              }
            >
              <AddCircleOutlineTwoToneIcon />
            </IconButton>
          </Box>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default QuantityField;
