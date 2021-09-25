import { Box, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',

    margin: '16px 0',
    '& > span': {
      margin: '0 16px',
    },
  },
}));

function FilterByPrice({ onChange }) {
  const classes = useStyle();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });
  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handelOnSubmit = () => {
    if (onChange) onChange(values);
    setValues(() => ({
      salePrice_gte: 0,
      salePrice_lte: 0,
    }));
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>
      <Box className={classes.range}>
        <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handelOnChange} />
        <span>-</span>
        <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handelOnChange} />
      </Box>
      <Button onClick={handelOnSubmit} color="primary" size="small" variant="outlined">
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
