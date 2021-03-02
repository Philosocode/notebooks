import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getParts } from "part/redux/part.thunks";
import { selectCurrentMaterial, selectMaterialParts } from "material/redux/material.selectors";

import { PartListItem } from "./part-list-item.component";

import { theme } from "shared/styles/theme.style";

interface IProps {
  materialId: string;
}
export const PartList: React.FC<IProps> = ({ materialId }) => {
  const dispatch = useDispatch();

  const currentMaterial = useSelector(selectCurrentMaterial);
  const materialParts = useSelector(selectMaterialParts);

  useEffect(() => {
    if (currentMaterial && !currentMaterial.partIds) {
      dispatch(getParts(materialId));
    }
  }, [currentMaterial, dispatch, materialId]);

  if (materialParts === undefined) return null;
  return (
    <SList>
      {
        materialParts.map(part => <PartListItem part={part} key={part.id} />)
      }
    </SList>
  )
};

const SList = styled.ul`
  margin-top: ${theme.spacing.md};
`;