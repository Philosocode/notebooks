import React from "react";
import styled from "styled-components";

import { ILinkGridItem, LinkGridItem } from "./link-grid-item.component";

interface IProps {
  handleDelete: (currentId: string, otherId: string) => void;
  links: ILinkGridItem[];
}
export const LinkGrid: React.FC<IProps> = ({ handleDelete, links }) => {
  return (
    <SGrid>
      {links.map(link =>
        <LinkGridItem key={link.otherId} handleDelete={handleDelete} link={link} />
      )}
    </SGrid>
  );
};

const SGrid = styled.div`
  display: flex;
    flex-wrap: wrap;
`;
