import React, { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";

import { SInputBorderless } from "shared/styles/form.styles";
import { theme } from "shared/styles/theme.styles";
import { TagPill } from "./tag-pill.component";

interface IProps {
  availableTags: string[];
  tagsToAdd: string[];
  setTagsToAdd: Dispatch<SetStateAction<string[]>>;
}
export const TagAutocompleteInput: FC<IProps> = ({
  availableTags,
  tagsToAdd,
  setTagsToAdd,
}) => {
  const [text, setText] = useState<string>("");

  // functions
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const clearInput = () => {
    setText("");
  };

  const dropdownItems = useCallback(() => {
    if (text.trim() === "") return null;

    return availableTags.filter((t) => {
      if (tagsToAdd.includes(t)) return false;
      if (!t.startsWith(text.toLowerCase())) return false;

      return true;
    });
    // eslint-disable-next-line
  }, [text]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    // prevent form submission
    event.preventDefault();
    addTag(text);
  };

  const addTag = (tag: string) => {
    const tagLower = tag.toLowerCase();

    // don't add tag if it's already added
    if (tagsToAdd.includes(tagLower)) return;

    setTagsToAdd((prevTags) => [...prevTags, tagLower]);
    clearInput();
  };

  const deleteTag = (tag: string) => {
    setTagsToAdd((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <SInputContainer>
      <SInputBorderless
        name="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Tag Name"
      />

      <STagList>
        {tagsToAdd.map((t) => (
          <TagPill tag={t} key={t} handleDelete={deleteTag} />
        ))}
      </STagList>

      <SDropdownList>
        {dropdownItems()?.map((t) => (
          <SDropdownItem key={t} onClick={() => addTag(t)}>{t}</SDropdownItem>
        ))}
      </SDropdownList>

    </SInputContainer>
  );
};

const SInputContainer = styled.div`
  position: relative;
`;

const STagList = styled.ul`
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
`;

const SDropdownList = styled.ul`
  background: ${theme.colors.white};
  list-style-type: none;
  position: absolute;
  top: 2.8rem;
  left: 0;
  width: 30rem;
  max-width: 80%;
`;

const SDropdownItem = styled.li`
  border: 1px solid ${theme.colors.gray[500]};
  border-top: none;
  cursor: pointer;
  padding: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.gray[100]};
  }

  &:first-of-type {
    border-top: 0;
  }
`;
