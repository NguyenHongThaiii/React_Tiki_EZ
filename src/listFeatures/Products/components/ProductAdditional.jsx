import React from 'react';
import PropTypes from 'prop-types';

ProductAdditional.propTypes = {
  product: PropTypes.object,
};

function ProductAdditional({ product = {} }) {
  return <div>Product additional</div>;
}

export default ProductAdditional;
