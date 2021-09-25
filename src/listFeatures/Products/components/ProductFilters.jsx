import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FiltersByCategory from './Filters/FiltersByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ onChange, filters }) {
  const handelCategoryChange = (newCategoryId) => {
    if (onChange) {
      const newFilters = {
        'category.id': newCategoryId.id,
        'category.name': newCategoryId.name,
      };
      onChange(newFilters);
    }
  };
  const handelChange = (newValue) => {
    if (onChange) onChange(newValue);
  };
  return (
    <Box>
      <FiltersByCategory onChange={handelCategoryChange} />
      <FilterByPrice onChange={handelChange} />
      <FilterByService filters={filters} onChange={handelChange} />
    </Box>
  );
}
export default ProductFilters;
