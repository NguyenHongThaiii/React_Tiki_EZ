import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from '../../../components/QuantityFIeld';

QuantityForm.propTypes = {
  onSubmit: PropTypes.func,
};

function QuantityForm({ onSubmit = null }) {
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
  const handelSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(handelSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: '260px' }}
        size="large"
      >
        Thêm vào giỏ hàng
      </Button>
    </form>
  );
}

export default QuantityForm;
