import React from "react";
import styled from "styled-components";

import { LinkGridItem } from "./link-grid-item.component";
import { theme } from "../../styles/theme.style";

interface ILinkGridItem {
  id: string;
  name: string;
  url: string;
}
interface IProps {
  links: ILinkGridItem[];
}
export const LinkGrid: React.FC<IProps> = ({ links }) => {
  return (
    <SGrid>
      {
        links.map(link => (
          <LinkGridItem
            key={link.id}
            linkUrl={link.url}
            name={link.name} />
        ))
      }
    </SGrid>
  );
};

const SGrid = styled.div`
  display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;