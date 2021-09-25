import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { formatPrice } from '../../../util';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  shortDescription: {
    marginTop: theme.spacing(1),
  },
  salePrice: {
    fontSize: theme.typography.h4.fontSize,
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
    fontWeight: '500',
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
    fontStyle: 'italic',
  },
  wrap: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(0, 2),
    backgroundColor: theme.palette.grey[200],
  },
  promotionPercent: {},
}));

function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { name, shortDescription, salePrice, promotionPercent, originalPrice } = product;
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.shortDescription}>
        {shortDescription}
      </Typography>
      <Box className={classes.wrap}>
        <Box component="span" className={classes.salePrice}>
          {salePrice && formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent}>
              {`-${promotionPercent}%`}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
