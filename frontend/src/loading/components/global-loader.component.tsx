import React from "react";
import { useSelector } from "react-redux";

import { selectIsLoading } from "loading/redux/loading.selectors";
import { Loader } from "./loader.component";

// FROM: https://loading.io/css/
export const GlobalLoader = () => {
  const isLoading = useSelector(selectIsLoading);
  if (!isLoading) return null;

  return <Loader />;
};