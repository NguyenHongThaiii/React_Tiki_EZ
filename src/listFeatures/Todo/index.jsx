import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './Page/ListPage/index.jsx';
import NotFound from '../../components/NotFound';
import DetailPage from '../PostList/Page/DetailPage/index.jsx';
TodoFeature.propTypes = {};

function TodoFeature(props) {
  const match = useRouteMatch();
  console.log(match.url);
  return (
    <div>
      TODO SHARED UI
      <Switch>
        <Route path={match.path} component={ListPage} exact></Route>
        <Route path={`${match.path}/:todoId`} component={DetailPage}></Route>

        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default TodoFeature;
