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

export interface IUser {
  email: string;
  google_id: string;
  name: string;
  photo_url: string;
}