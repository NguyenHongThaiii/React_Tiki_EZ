import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductTabs.propTypes = {
  current: PropTypes.string,
  onChange: PropTypes.func,
};
function ProductTabs({ onChange, current }) {
  const handelOnChange = (e, newValue) => {
    if (onChange) onChange(newValue);
    // console.log(newValue);
  };
  return (
    <Tabs indicatorColor="primary" value={current} onChange={handelOnChange}>
      <Tab label="Gía thấp tới cao" value="salePrice:ASC"></Tab>
      <Tab label="Gía cao tới thấp" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

export default ProductTabs;
