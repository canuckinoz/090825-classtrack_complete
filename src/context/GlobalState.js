import React, { createContext, useContext, useReducer } from 'react';

// Create a context for global state.  This holds user auth status,
// behaviour logs and prediction data.  State transitions are defined
// in the reducer function below.

const GlobalContext = createContext();

const initialState = {
  user: null,
  token: null,
  logs: [],
  predictions: {},
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload.user, token: action.payload.token, error: null };
    case 'LOGOUT':
      return { ...state, user: null, token: null, logs: [], predictions: {} };
    case 'SET_LOGS':
      return { ...state, logs: action.payload };
    case 'ADD_LOG':
      return { ...state, logs: [...state.logs, action.payload] };
    case 'SET_PREDICTIONS':
      return { ...state, predictions: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook for consuming the context
export function useGlobalContext() {
  return useContext(GlobalContext);
}