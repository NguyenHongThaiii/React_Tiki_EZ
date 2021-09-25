import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/InputField';
import PasswordField from '../../../../components/PasswordFied';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1.5),
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(2, 0, 2, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 3, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(-1),
    left: 0,
    right: 0,
  },
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name.')
      .test('Should has at least two words.', 'Please enter at least two words.', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter an valid email address.'),
    password: yup
      .string()
      .required('Please enter your password.')
      .min(6, 'Please enter at least six characters.'),
    retypePassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match.'),
  });

  const form = useForm({
    defaultValues: {
      indentifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const handelOnSumit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handelOnSumit)}>
        <InputField name="fullName" label="Full Name" form={form}></InputField>
        <InputField name="email" label="Email" form={form}></InputField>
        <PasswordField name="password" label="Password" form={form}></PasswordField>
        <PasswordField name="retypePassword" label="Retype Password" form={form}></PasswordField>
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          fullWidth
        >
          Create An Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
