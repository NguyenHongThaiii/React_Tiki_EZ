import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import AlbumFeature from './listFeatures/Album';
import CounterFeature from './listFeatures/Counter';
import PostFeature from './listFeatures/PostList';
import ProductsFeature from './listFeatures/Products';
import TodoFeature from './listFeatures/Todo';
import CartFeature from './listFeatures/Cart/index';
function App() {
  return (
    <div className="App">
      <Header />
      <div>{/* <Link to="/postList">PostList</Link> */}</div>
      <Switch>
        {/* <Redirect from="/" to="/app" exact /> */}

        <Route path="/app" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} exact />
        <Route path="/postList" component={PostFeature} />
        <Route path="/album" component={AlbumFeature} />
        <Route path="/products" component={ProductsFeature} />
        <Route path="/cart" component={CartFeature} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
