import { selectIsLoading } from "loading/redux/loading.selectors";
import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

export const GlobalLoader = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return ReactDOM.createPortal(
    // https://loading.io/css/
    <div className="loader-container">
      <div className="lds-ring border-green-500">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>,
    document.body
  );
};
