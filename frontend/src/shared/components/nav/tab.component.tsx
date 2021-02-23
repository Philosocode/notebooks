import React from "react";

interface IProps {
  selectedTab: string;
  title: string;
}
export const Tab: React.FC<IProps> = ({
  children,
  selectedTab,
  title
}) => {
  if (selectedTab !== title) return null;

  return (
    <div>{children}</div>
  );
 };