import React from 'react';
import PropTypes from 'prop-types';

ProductViews.propTypes = {
  product: PropTypes.object,
};

function ProductViews({ product = {} }) {
  return <div>Product Views</div>;
}

export default ProductViews;
