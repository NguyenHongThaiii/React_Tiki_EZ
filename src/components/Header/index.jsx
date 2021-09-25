import { Badge, Box, Container, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Login from '../../listFeatures/Auth/components/Login';
import Register from '../../listFeatures/Auth/components/Register';
import { logout } from '../../listFeatures/Auth/userSlice';
import { cartItemsQuantitySelector } from './../../listFeatures/Cart/cartSelector';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  close: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const history = useHistory();
  const quantityCartItems = useSelector(cartItemsQuantitySelector);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const LoggedUser = useSelector((state) => state.user.current);
  const classes = useStyles();
  const isLoggedIn = !!LoggedUser.id;
  const handleClickLogin = () => {
    setMode(MODE.LOGIN);
    setOpen(true);
  };
  const handleClickRegister = () => {
    setMode(MODE.REGISTER);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handelClickMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handelCloseMenu = () => {
    setAnchorEl(null);
  };
  const handelLogout = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  };
  const moveIntoCartPage = () => {
    if (isLoggedIn) {
      history.push('/cart');
    } else {
      setMode(MODE.LOGIN);
      setOpen(true);
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <CodeIcon className={classes.menuButton} />
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/app">
                CyStore
              </Link>
            </Typography>
            <IconButton onClick={moveIntoCartPage} aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={isLoggedIn ? quantityCartItems : 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {!isLoggedIn && (
              <>
                <Button onClick={handleClickLogin} color="inherit">
                  LOGIN
                </Button>
                <Button onClick={handleClickRegister} color="inherit">
                  Register
                </Button>
              </>
            )}
            {isLoggedIn && (
              <IconButton color="inherit" onClick={handelClickMenu}>
                <AccountCircle color="inherit" />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handelCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handelCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handelLogout}>Logout</MenuItem>
      </Menu>

      <Dialog
        disableEscapeKeyDown
        // disableBackdropClick
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton onClick={handleClose} className={classes.close}>
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <Login handelCLoseDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  YOU DON'T HAVE ACCOUNT. REGISTER HERE
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.REGISTER && (
            <>
              <Register handelCLoseDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  YOU HAVE ACCOUNT. SING IN HERE
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
