import { AnyAction, Reducer } from "redux";
import { AUTH } from "../types";
import { AuthState } from "../types";

const initialState = {
  data: {
    user: {
      username: "",
      email: ""
    },
    token: "",
  },
  status: ""
};

const authReducer: Reducer<AuthState, AnyAction> = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AUTH.LOGIN_REQUESTED:
      return {...state, status: "waiting"};
    case AUTH.LOGIN_SUCCESS:
      return {
        data: {
          user: {
            username: action.payload.user.username,
            email: action.payload.user.email
          },
          token: action.payload.token
        },
        status: "loggedin"
      }
    case AUTH.LOGIN_FAILED:
      return {
        ...initialState,
        status: "failed"
      }
    case AUTH.LOGIN_VERIFY:
      return {
        data: {
          user: {
            username: action.payload.data.user.username,
            email: action.payload.data.user.email
          },
          token: action.payload.token
        },
        status: "loggedin"
      }
    case AUTH.LOGOUT:
      localStorage.removeItem('token');
      return initialState;
    default:
      return state;
  }
}

export default authReducer;