import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersApi from '../../API/usersApi';
import StorageKey from '../../constants/storage-keys';

// action register
export const register = createAsyncThunk('users/register', async (payload) => {
  // call api to register
  const data = await usersApi.register(payload);
  // save data to local storage
  localStorage.setItem(StorageKey.TOKEN, data.jwt);
  localStorage.setItem(StorageKey.USER, JSON.stringify(data.user));
  // return user data
  return data.user;
});

// action login
export const login = createAsyncThunk('users/login', async (payload) => {
  // call api to login
  const data = await usersApi.login(payload);
  // save data to local storage
  localStorage.setItem(StorageKey.TOKEN, data.jwt);
  localStorage.setItem(StorageKey.USER, JSON.stringify(data.user));
  // return user data
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKey.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      // xoa localStorage
      localStorage.removeItem(StorageKey.USER);
      localStorage.removeItem(StorageKey.TOKEN);
      // xoa state
      state.current = {};
    },
  },
  extraReducers: {
    // user/register/fullfilled = action type
    [register.fulfilled]: (state, action) => {
      console.log('state.current', state.current);
      console.log('action.payload', action.payload);
      state.current = action.payload;
      console.log('state.current', state.current);
    },
    // user/login/fullfilled = action type
    [login.fulfilled]: (state, action) => {
      console.log('state.current', state.current);
      console.log('action.payload', action.payload);
      state.current = action.payload;
      console.log('state.current', state.current);
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
