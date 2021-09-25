import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import DetailPage from './Page/DetailPage';
import ListPage from './Page/ListPage';

PostFeature.propTypes = {};
function PostFeature(props) {
  const match = useRouteMatch();
  console.log(match);
  return (
    <div>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/:postLitId`} component={DetailPage} exact />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default PostFeature;
