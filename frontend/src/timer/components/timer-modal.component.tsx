import { IModalProps } from "modal/redux/modal.types";
import React from "react";

interface IProps extends IModalProps {}
export const TimerModal: React.FC<IProps> = ({
  handleClose
}) => {
  return (
    <div>
      TIMER
    </div>
  )
}