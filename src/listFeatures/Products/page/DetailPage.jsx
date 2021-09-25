import { Box, Container, Grid, makeStyles, Paper, LinearProgress } from '@material-ui/core';
import React from 'react';
import { Route, useRouteMatch } from 'react-router';
import { Switch } from 'react-router-dom';
import { addToCart } from '../../Cart/cartSlice';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import useDetailPage from '../Hooks/useDetailPage';
import ProductThumbnail from './../components/ProductThumbnail';
import ProductViews from './../components/ProductViews';
import QuantityForm from './../components/QuanityForm';
import { useDispatch } from 'react-redux';

DetailPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  progress: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,

    width: '100%',
  },
}));
function DetailPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  //   get id
  const {
    params: { productId },
    url,
  } = useRouteMatch();
  //   customHook (viet o day cung duoc)
  const { product, loading } = useDetailPage(productId);
  const handelSumit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      quantity,
      product,
    });
    dispatch(action);
  };
  if (loading) {
    return (
      <Box className={classes.progress}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>

            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <QuantityForm onSubmit={handelSumit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Switch>
          <Route exact path={`${url}/description`}>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/additional`} component={ProductAdditional} exact />
          <Route path={`${url}/reviews`} component={ProductViews} exact />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
