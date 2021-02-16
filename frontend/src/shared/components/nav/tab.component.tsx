import React from "react";

interface IProps {
  title: string;
}
export const Tab: React.FC<IProps> = ({ children }) => (
  <div>{children}</div>
)