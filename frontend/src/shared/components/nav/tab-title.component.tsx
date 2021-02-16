import React, { useCallback } from "react";

interface IProps {
  index: number;
  setSelectedTab: (index: number) => void;
  title: string;
}
export const TabTitle: React.FC<IProps> = ({ index, setSelectedTab, title }) => {
  const handleClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <li>
      <button onClick={handleClick}>{title}</button>
    </li>
  );
};
