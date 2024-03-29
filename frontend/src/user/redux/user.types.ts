export interface IUser {
  id: string;
  email: string;
  google_id: string;
  name: string;
  photo_url?: string;
}

export interface IUserSettings {
  autoStartTimer: boolean;
  forcedBreaks: boolean;
  showWelcomeWizard: boolean;
  showPreStudyModal: boolean;
  defaultStudyTime: number;
  defaultBreakTime: number;
  defaultLongBreakTime: number;
}

export interface IUserState {
  user?: IUser;
  token?: string;
  settings?: IUserSettings;
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