import { FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import RemoveCircleOutlineTwoToneIcon from '@mui/icons-material/RemoveCircleOutlineTwoTone';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
CartQuantityField.propTypes = {
  onInput: PropTypes.func,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.number,
};
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex_flow: 'row nowrap',
    alignItems: 'center',

    maxWidth: '200px',
  },
}));
function CartQuantityField(props) {
  const classes = useStyle();
  const { name, id, disabled, form, onInput = null } = props;
  const quantityFromCart = useSelector((state) => state.cart.cartItems);
  const index = quantityFromCart.findIndex((item) => item.id === id);
  const [quantity, setQuantity] = useState(() => quantityFromCart[index].quantity);
  const { control, setValue } = form;
  const handelOnChange = (e) => {
    const values = e.target.value;
    setQuantity(values);
    if (!onInput) return;

    onInput({ quantity: values, id });
  };
  const handelClick = (values) => {
    console.log(values);
    setQuantity(values);
    if (!onInput) return;

    onInput({ quantity: values, id });
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value = quantity, name },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <FormControl fullWidth size="small" error={invalid} margin="normal" variant="outlined">
          <Box className={classes.root}>
            <IconButton
              disabled={Number.parseInt(quantity) <= 1}
              onClick={() => handelClick(Number.parseInt(quantity) - 1)}
            >
              <RemoveCircleOutlineTwoToneIcon />
            </IconButton>
            <OutlinedInput
              id={name}
              type="number"
              value={quantity > 0 ? quantity : 1}
              onBlur={onBlur}
              onChange={onChange}
              onInput={handelOnChange}
              disbled={disabled}
            />
            <IconButton
              onClick={
                () => handelClick(Number.parseInt(quantity) + 1)
                // setValue(name, Number.parseInt(quantity) ? Number.parseInt(quantity) + 1 : 1)
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

export default CartQuantityField;
