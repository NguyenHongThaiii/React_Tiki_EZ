import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CartQuantityField from './../../../components/CartQuantityField/index';

FormCartItem.propTypes = {
  onInput: PropTypes.func,
  id: PropTypes.number.isRequired,
};

function FormCartItem({ onInput = null, id }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Please enter at least 1 quantity')
      .typeError('Please enter quantity'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handelChange = (values) => {
    if (onInput) {
      onInput(values);
    }
  };
  return (
    <form>
      <CartQuantityField onInput={handelChange} name="quantity" id={id} form={form} />
    </form>
  );
}

export default FormCartItem;
