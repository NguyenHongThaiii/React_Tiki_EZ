import React from 'react';
import ListPage from './page';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import NotFound from './../../components/NotFound/index';
import DetailPage from './page/DetailPage';
function ProductsFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} component={ListPage} exact />
        <Route path={`${match.url}/:productId`} component={DetailPage} />

        <Route component={NotFound}></Route>
      </Switch>
    </Box>
  );
}

export default ProductsFeature;
