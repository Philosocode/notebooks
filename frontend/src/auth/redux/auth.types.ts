import { IUser } from "../../user/redux/user.types";

export interface IAuthState {
  user?: IUser;
  token?: string;
}

export interface IAuthToken {
  user: IUser;
  iad: number;
  exp: number;
}

export interface ILoginPayload {
  user: IUser;
  token: string;
}