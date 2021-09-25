import { Box, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { STATIC_HOST, THUMBNAIL_URL } from '../../../constants';
import ReactImageMagnify from 'react-image-magnify';

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  smallImage: {
    paddingTop: theme.spacing(1),
    borderRadius: '4px',
  },
  active: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

function ProductThumbnail({ product = {} }) {
  const classes = useStyles();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_URL;
  const handleClickImg = (e) => {
    const elementImg = e.target;
    if (elementImg.classList.contains('active')) {
      elementImg.classList.remove('active');
    } else {
      elementImg.classList.add('active');
    }
  };
  return (
    <Box>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: `${product.name}`,
            isFluidWidth: true,
            src: `${thumbnailUrl}`,
          },
          largeImage: {
            src: `${thumbnailUrl}`,
            width: 1200,
            height: 1800,
          },
        }}
      />
      <Box className={classes.smallImage}>
        <img src={thumbnailUrl} alt={product.name} width="20%" onClick={handleClickImg} />
      </Box>
    </Box>
  );
}

export default ProductThumbnail;
