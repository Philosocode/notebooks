import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { getUserSettings } from "user/redux/user.thunks";
import { selectSettingsLoaded } from "../redux/init.selectors";
import { selectUser } from "user/redux/user.selectors";
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants.shared";
import { IAuthToken } from "user/redux/user.types";
import { login, logout } from "user/redux/user.slice";
import { setSidebarShowing } from "../redux/global.slice";
import { useIsMobile } from "./use-is-mobile.hook";

export function useInit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const settingsLoaded = useSelector(selectSettingsLoaded);
  const isMobile = useIsMobile();

  // load settings if logged in
  useEffect(() => {
    if (!user || settingsLoaded) return;

    dispatch(getUserSettings(user.id));
  }, [user, dispatch, settingsLoaded]);

  // scroll to top when link changes
  useEffect(() => {
    const stopListening = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => stopListening();
    // eslint-disable-next-line
  }, [history, window.location.pathname]);

  // intiially show/hide sidebar depending on window width
  useEffect(() => {
    if (!user) return;

    isMobile
      ? dispatch(setSidebarShowing(false))
      : dispatch(setSidebarShowing(true));
  }, [user, isMobile, dispatch]);

  // automatically load user from local storage token
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (tokenFromStorage) {
      const decoded: IAuthToken = jwtDecode(tokenFromStorage);
      const timeRemaining = decoded.exp * 1000 - new Date().getTime();

      if (timeRemaining > 0) {
        dispatch(login({ token: tokenFromStorage, user: decoded.user }));
      } else {
        dispatch(logout());
        history.push("/");
      }
    }
  }, [dispatch, history]);
}