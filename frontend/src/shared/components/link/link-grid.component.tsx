import React from "react";
import styled from "styled-components";

import { ILinkGridItem, LinkGridItem } from "./link-grid-item.component";

interface IProps {
  links: ILinkGridItem[];
}
export const LinkGrid: React.FC<IProps> = ({ links }) => {
  return (
    <SGrid>
      { links.map(link => <LinkGridItem key={link.link_id} link={link} />) }
    </SGrid>
  );
};

const SGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
