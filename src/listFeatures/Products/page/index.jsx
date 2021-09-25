import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@mui/material';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';
import ProductSkeleton from '../components/ProductSkeleton';
import ProductTabs from '../components/ProductTabs';
import productApi from './../../../API/productApi';
import FilterViewer from './../components/FilterViewer';
import ProductFilters from './../components/ProductFilters';
import { useMemo } from 'react/cjs/react.development';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexGrow: 'row no-wrap',
    justifyContent: 'center',

    marginTop: '30px',
    paddingBottom: '20px',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  console.log(!!queryParams.isPromotion);
  // (1) history.location.search === (2) location.search nhưng (1) không thay đổi còn (2) thay đổi
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: 12,
    total: 120,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPaginationState(pagination);
      } catch (error) {
        console.log('Fail to fetch productList', error);
      }
    })();
    setLoading(false);
  }, [queryParams]);
  const handelOnChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handelSortChange = (newValue) => {
    const filters = {
      ...queryParams,
      _sort: newValue,
      _page: 1,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handelFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
      _page: 1,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };
  return (
    <Box>
      <Container>
        <Grid container>
          <Grid item className={classes.left}>
            <Paper>
              <ProductFilters onChange={handelFiltersChange} filters={queryParams} />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper>
              <ProductTabs current={queryParams._sort} onChange={handelSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

              {loading ? <ProductSkeleton /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  defaultPage={6}
                  siblingCount={0}
                  boundaryCount={1}
                  color="primary"
                  count={Math.ceil(paginationState.total / paginationState.limit)}
                  page={paginationState.page}
                  onChange={handelOnChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
