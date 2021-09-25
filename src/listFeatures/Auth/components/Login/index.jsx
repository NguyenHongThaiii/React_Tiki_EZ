import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import LoginForm from '../LoginForm';
Login.propTypes = {
  handelCLoseDialog: PropTypes.func,
};
Login.defaultProps = {
  handelCLoseDialog: null,
};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handelSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log(user);
      //   do something at here
      const { handelCLoseDialog } = props;
      if (handelCLoseDialog) {
        handelCLoseDialog();
      }
    } catch (error) {
      console.log('Fail call Api', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handelSubmit} />
    </div>
  );
}

export default Login;
