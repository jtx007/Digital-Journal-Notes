import React from 'react';

const INITIAL_STATE = {
  isLoggedIn: localStorage.getItem("isLoggedIn") ? true : false,
  token: localStorage.getItem("token") || null,
  user_id: localStorage.getItem("userId") || null,
  setToken: () => {},
  setIsLoggedIn: () => {},
  setUserId: () => {}
};

export const LoginContext = React.createContext(INITIAL_STATE)
