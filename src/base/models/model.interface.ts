export interface IUser {
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  lastLoginAt: string;
  lastRefreshAt: string;
  uid: string;
  photoUrl: string;
}

export interface IUserStore {
  user: IUser | undefined;
  setUser: (user: IUserStore["user"]) => void;
}

export interface IFormInput {
  username?: string;
  email: string;
  password: string;
}

export interface User {
  id: string | null;
  email: string;
  password: string;
  name: string;
}
export interface LoginFormInput {
  email: string;
  password: string;
}

export interface SignUpFormInput {
  name: string;
  email: string;
  password: string;
}
