import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { theme } from "../../styles/theme.style";

export interface ILinkGridItem {
  link_id: string;
  ownerEntityId: string;
  name: string;
  url: string;
  handleDelete: (linkId: string, ownerEntityId: string) => void;
}
interface IProps {
  link: ILinkGridItem;
}
export const LinkGridItem: React.FC<IProps> = ({ link }) => {
  function handleDeleteClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    link.handleDelete(link.link_id, link.ownerEntityId);
  }

  return (
    <SLink to={link.url}>
      <div>{link.name}</div>
      <SIcon
        icon="trash"
        onClick={handleDeleteClick}
      />
    </SLink>
  )
}

const SIcon = styled(FontAwesomeIcon)`
  visibility: hidden;
  font-size: 1.2em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;

  &:hover {
    color: ${theme.colors.gray[600]};
  }
`;

const SLink = styled(Link)`
  background: ${theme.colors.offWhite};
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  font-weight: 500;
  margin: ${theme.spacing.base};
  padding: ${theme.spacing.md} ${theme.spacing.base};
  position: relative;
  text-align: center;
  width: 100%;
  max-width: 25rem;

  &:hover {
    background: ${theme.colors.green[400]};
    color: ${theme.colors.white};
  }

  &:hover ${SIcon} {
    visibility: visible;
  }
`;
