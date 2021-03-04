import React from "react";
import { DetailHeader } from "../../shared/components/info/detail-header.component";
import { IPart } from "../redux/part.types";

interface IProps {
  part: IPart;
}
export const PartDetailHeader: React.FC<IProps> = ({ part }) => {
  return (
    <DetailHeader
      name={part.name}
      updatedAt={part.updated_at}
      showUpdateModal={() => {}}
      topSlot={<h1>Hello world</h1>}
    />
  )
}