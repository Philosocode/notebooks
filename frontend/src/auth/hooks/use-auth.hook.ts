import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { IAuthToken } from "auth/redux/auth.types";
import { LOCAL_STORAGE_TOKEN_KEY } from "shared/constants.shared";
import { login, logout } from "auth/redux/auth.slice";
import { setAuthLoaded } from "loading/redux/loading.slice";
import { selectAppLoaded } from "loading/redux/loading.selectors";
import { getConcepts } from "../../concept/redux/concept.thunks";

export const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const appLoaded = useSelector(selectAppLoaded);

  const tokenTimeRemaining = useCallback((token: IAuthToken) => {
    return token.exp * 1000 - new Date().getTime();
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    history.push("/");
  }, [dispatch, history]);

  // automatically load user from local storage token
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (tokenFromStorage) {
      const decoded: IAuthToken = jwtDecode(tokenFromStorage);
      const timeRemaining = tokenTimeRemaining(decoded);

      if (timeRemaining > 0) {
        dispatch(login({ token: tokenFromStorage, user: decoded.user }));
        dispatch(getConcepts());
      } else {
        handleLogout();
      }
    }

    if (!appLoaded) dispatch(setAuthLoaded());
  }, [dispatch, tokenTimeRemaining, handleLogout]);
};
