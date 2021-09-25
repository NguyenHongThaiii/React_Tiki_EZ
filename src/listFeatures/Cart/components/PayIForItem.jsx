import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Button, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { cartItemsTotalSelector } from '../cartSelector';
import { formatPrice } from '../../../util';

PayIForItem.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  wrap: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    paddingBottom: theme.spacing(2),
  },
  wrapText: {
    display: 'flex',
    justifyContent: 'center',

    paddingTop: theme.spacing(2),
  },
  textLeft: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
  },
  textRight: {
    flex: 1,
    textAlign: 'right',
    paddingRight: theme.spacing(2),
  },
  pay: {
    padding: theme.spacing(2, 2),
  },
}));
function PayIForItem(props) {
  const cartItemTotal = useSelector(cartItemsTotalSelector);
  const classes = useStyles();
  return (
    <Box>
      <Paper>
        <Box className={classes.wrap}>
          <Box className={classes.wrapText}>
            <Typography className={classes.textLeft}>Tạm tính</Typography>
            <Typography className={classes.textRight}>{formatPrice(cartItemTotal)}</Typography>
          </Box>
          <Box className={classes.wrapText}>
            <Typography className={classes.textLeft}>Tổng cộng</Typography>
            <Typography className={classes.textRight}>{formatPrice(cartItemTotal)}</Typography>
          </Box>
        </Box>
        <Box className={classes.pay}>
          <Button fullWidth variant="contained" color="primary" size="large">
            Thanh toán ngay
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default PayIForItem;
