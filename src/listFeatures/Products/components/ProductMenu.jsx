import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
    '& > li': {
      padding: theme.spacing(2, 4),
    },
    '& > li >a': {
      color: theme.palette.grey[700],
    },
    '& > li >a.active': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
}));

function ProductMenu(props) {
  const { url } = useRouteMatch();
  const classes = useStyles();
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={`${url}/description`}>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`}>
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`}>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
