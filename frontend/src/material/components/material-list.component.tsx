import React from "react";
import styled from "styled-components";

import { IMaterial } from "../redux/material.types";
import { MaterialListItem } from "./material-list-item.component";

interface IProps {
  materials: IMaterial[];
}
export const MaterialList: React.FC<IProps> = ({ materials }) => {
  return (
    <SMaterialList>
      {materials.map((material) => (
        <MaterialListItem material={material} key={material.id} />
      ))}
    </SMaterialList>
  );
};

const SMaterialList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
