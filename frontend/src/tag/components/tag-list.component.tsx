import React, { FC } from "react";
import styled from "styled-components";

import { TagPill } from "./tag-pill.component";

interface IProps {
  handleDeleteTag?: (tag: string) => void;
  tags: string[];
}
export const TagList: FC<IProps> = ({ handleDeleteTag, tags }) => {
  function getTagPillProps(tag: string) {
    return {
      key: tag,
      tag,
      ...(handleDeleteTag && { handleDelete: () => handleDeleteTag(tag) } )
    }
  }
  return (
    <STagList>
      {tags.map((t) => (
        <TagPill {...getTagPillProps(t)} />
      ))}
    </STagList>
  );
};

const STagList = styled.ul`
  list-style-type: none;
  display: flex;
`;
