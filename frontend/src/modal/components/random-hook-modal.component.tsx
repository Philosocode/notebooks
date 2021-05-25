import React from "react";

import { connectHooks, processHooks } from "hook/data/hooks.data";
import { RandomModal } from "./random-modal.component";

const items = [...connectHooks, ...processHooks].map(hookText => <p>{hookText}</p>);

interface IProps {
  handleClose: () => void;
  isShowing: boolean;
}
export const RandomHookModal: React.FC<IProps> = ({ handleClose, isShowing }) => {
  return <RandomModal items={items} isShowing={isShowing} title="Random Hook" handleClose={handleClose} />;
};