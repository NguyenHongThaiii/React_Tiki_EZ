import { Box, ButtonBase, IconButton, makeStyles, Typography } from '@material-ui/core';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setQuantity } from '../cartSlice';
import { STATIC_HOST, THUMBNAIL_URL } from './../../../constants/common';
import { cartItemsQuantitySelector } from './../cartSelector';
import FormCartItem from './formCartItem';
import { useHistory } from 'react-router-dom';

CartItem.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    width: '80px',
    height: '80px',

    marginRight: theme.spacing(5),
  },
  wrap: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 2),
  },
  marginClass: {
    flex: 1,
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
    fontStyle: 'italic',
  },
}));
function CartItem(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const handelChange = ({ quantity, id }) => {
    quantity = quantity > 0 ? Number.parseInt(quantity) : 1;
    const action = setQuantity({ quantity, id });
    dispatch(action);
  };
  const handelRemove = ({ id }) => {
    const action = removeFromCart({ id });
    dispatch(action);
  };
  const handelToDetailPage = ({ id }) => {
    history.push(`products/${id}`);
  };
  return (
    <Box className={classes.root}>
      {cartItems.map((item) => (
        <Box key={item.id} className={classes.wrap}>
          <ButtonBase
            onClick={() => handelToDetailPage({ id: item.id })}
            sx={{ width: 128, height: 128 }}
          >
            <img
              className={classes.image}
              alt="complex"
              src={
                item.product.thumbnail
                  ? `${STATIC_HOST}${item.product.thumbnail?.url}`
                  : THUMBNAIL_URL
              }
            />
          </ButtonBase>
          <Typography className={classes.marginClass}>{item.product.name}</Typography>
          <Typography className={classes.marginClass}>
            <Box component="span" fontWeight="bold" mr={1} fontSize="16px">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                item.product.salePrice
              )}
            </Box>
            {item.product.promotionPercent > 0 && (
              <Box className={classes.originalPrice} component="span">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                  item.product.salePrice
                )}
              </Box>
            )}
          </Typography>
          <FormCartItem
            className={classes.marginClass}
            onInput={handelChange}
            id={item.product.id}
          />
          <IconButton
            className={classes.marginClass}
            onClick={() => handelRemove({ id: item.product.id })}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}

export default CartItem;
