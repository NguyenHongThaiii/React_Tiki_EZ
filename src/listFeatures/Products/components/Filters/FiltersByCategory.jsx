import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, makeStyles } from '@material-ui/core';
import categoryApi from './../../../../API/categoryApi';
import CategorySkeleton from './../CategorySkeleton';

FiltersByCategory.propTypes = {
  onChange: PropTypes.func,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& >li ': {
      marginTop: theme.spacing(1),
      transition: 'all 0.25s linear',
      '&:hover': {
        color: 'blue',
      },
    },
  },
}));

function FiltersByCategory({ onChange }) {
  const classes = useStyle();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Fail to fetch category list', error);
      }
      setLoading(false);
    })();
  }, []);
  const handelOnClickCategory = (categoryId) => {
    if (onChange) {
      onChange(categoryId);
    }
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      {loading ? (
        <CategorySkeleton length={6} />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li variant="body2" key={category.id} onClick={() => handelOnClickCategory(category)}>
              <Typography variant="body2">{category.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default FiltersByCategory;
