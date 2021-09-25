import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Skeleton } from '@mui/material';

CategorySkeleton.propTypes = {
  length: PropTypes.number,
};
CategorySkeleton.defaultProps = {
  length: 6,
};

function CategorySkeleton({ length }) {
  return (
    <Box minHeight={170}>
      {Array.from(new Array(length)).map((x, index) => (
        <Box key={index} mt={1}>
          <Skeleton />
        </Box>
      ))}
    </Box>
  );
}

export default CategorySkeleton;
