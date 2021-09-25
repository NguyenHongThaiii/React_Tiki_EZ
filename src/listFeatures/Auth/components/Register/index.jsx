import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';
Register.propTypes = {
  handelCLoseDialog: PropTypes.func,
};
Register.defaultProps = {
  handelCLoseDialog: null,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handelSubmit = async (values) => {
    try {
      // auto set username = email
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log(user);
      //   do something at here
      const { handelCLoseDialog } = props;
      if (handelCLoseDialog) {
        handelCLoseDialog();
      }
      enqueueSnackbar('Register succeedfully', { variant: 'success' });
    } catch (error) {
      console.log('Fail call Api', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handelSubmit} />
    </div>
  );
}

export default Register;
