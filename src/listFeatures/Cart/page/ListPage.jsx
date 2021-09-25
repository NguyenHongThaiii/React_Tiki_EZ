import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import PayIForItem from '../components/PayIForItem';
import CartItem from './../components/CartItem';

ListPage.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
  left: {
    width: '910px',
  },
  right: {
    width: `calc(100% - 915px)`,
  },
  paperLeft: {},
}));
function ListPage(props) {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Container spacing={10}>
        <Grid container>
          <Paper className={classes.paperLeft}>
            <Grid item className={classes.left}>
              <CartItem />
            </Grid>
          </Paper>
          <Grid item className={classes.right}>
            <PayIForItem />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
