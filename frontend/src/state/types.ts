export enum AUTH {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_VERIFY,
  LOGIN,
  LOGOUT
};

export type AuthState = {
  data: {
    user: {
      username: string,
      email: string
    },
    token: string,
  },
  status: string
};

export type Recipe = {
  name: string,
  description: string,
  ingredients: string[],
  steps: string[],
  images: string[],
  timestamp: string,
  _id: string,
  author?: string,
}

export const defaultRecipe = {
  name: "",
  description: "",
  ingredients: [""],
  steps: [""],
  images: [""],
  timestamp: "",
  _id: ""
}