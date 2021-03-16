export interface IUser {
  email: string;
  google_id: string;
  name: string;
  photo_url: string;
  settings: IUserSettings;
}

export interface IUserSettings {
  autoStartTimer: boolean;
  forcedBreaks: boolean;
  showWelcomeModal: boolean;
  defaultStudyTime: number;
  defaultBreakTime: number;
}