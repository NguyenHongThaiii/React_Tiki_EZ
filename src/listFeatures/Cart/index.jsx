import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ListPage from './page/ListPage';

CartFeature.propTypes = {};

function CartFeature(props) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} component={ListPage} exact />
    </Switch>
  );
}

export default CartFeature;
