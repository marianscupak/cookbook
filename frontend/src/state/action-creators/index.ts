import { AppDispatch } from "../store"
import { AUTH } from "../types";

export const login = (username: string, password: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: AUTH.LOGIN_REQUESTED
    });
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username,
          password
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        localStorage.setItem('token', json.token);
        dispatch({
          type: AUTH.LOGIN_SUCCESS,
          payload: {
            user: {
              username,
              email: "email"
            },
            token: json.token
          }
        });
      }
      else {
        dispatch({
          type: AUTH.LOGIN_FAILED,
        });
      }
    }); 
  }  
}

export const verify = (data: {
  user: {
    username: string,
    email: string
  },
  token: string
}) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: AUTH.LOGIN_VERIFY,
      payload: {
        data
      }
    })
  }
}

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: AUTH.LOGOUT
    });
  }
}