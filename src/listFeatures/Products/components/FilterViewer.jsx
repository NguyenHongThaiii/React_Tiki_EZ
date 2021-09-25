import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';
import { useMemo } from 'react/cjs/react.development';

FilterViewer.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',

    padding: 0,
    margin: theme.spacing(2, 0),
    listStyleType: 'none',
    '&>li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTERS_LIST = [
  {
    id: 1,
    getLabel: () => 'Miễn phí vận chuyển',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemove: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      //   console.log('newFilters', newFilters);
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Có khuyến mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemove: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isPromotion) {
        delete newFilters.isPromotion;
      } else {
        newFilters.isPromotion = true;
      }
      return newFilters;
    },
    onToggle: (filters) => {},
  },
  {
    id: 3,
    getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Number.parseInt(filters.salePrice_gte) > 0 &&
      Number.parseInt(filters.salePrice_lte) > 0 &&
      Object.keys(filters).includes('salePrice_gte') &&
      Object.keys(filters).includes('salePrice_lte'),
    isRemove: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: (filters) => {},
  },
  {
    id: 4,
    getLabel: (filters) => `${filters['category.name']}`,
    isActive: () => true,
    isVisible: (filters) => filters['category.name'],
    isRemove: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.name'];
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: (filters) => {},
  },
];

function FilterViewer({ filters = {}, onChange = null }) {
  console.log(filters);
  const classes = useStyles();
  const visibleMemo = useMemo(() => {
    return FILTERS_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);
  return (
    <Box component="ul" className={classes.root}>
      {visibleMemo.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            onDelete={
              x.isRemove
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onRemove(filters);
                    // console.log(newFilters);
                    onChange(newFilters);
                  }
                : null
            }
            clickable={!x.isRemove}
            onClick={
              !x.isRemove
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
