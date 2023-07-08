export type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

interface AuthState {
  currentUser: User | null;
}

interface User {
  id: string | null;
  name: string;
  email: string;
  password: string;
}

export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        currentUser: null,
      };
    }
    default:
      return state;
  }
};
