import { selectConceptTags } from "concept/redux/concept.selectors";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { SInputBorderless } from "shared/styles/form.styles";
import { theme } from "shared/styles/theme.styles";
import { TagPill } from "./tag-pill.component";

export const TagAutocompleteInput = () => {
  const [text, setText] = useState<string>("");

  const conceptTags = useSelector(selectConceptTags);
  const [addedTags, setAddedTags] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const clearInput = () => {
    setText("");
  };

  const dropdownItems = useCallback(() => {
    if (text.trim() === "") return null;
    
    return conceptTags.filter(t => {
      if (addedTags.includes(t)) return false;
      if (!t.startsWith(text.toLowerCase())) return false;

      return true;
    });
    // eslint-disable-next-line
  }, [text]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    // prevent form submission
    event.preventDefault();
    handleAddTag(text);
  };

  const handleAddTag = (tag: string) => {
    const textLower = text.toLowerCase();

    // don't add tag if it's already added
    if (addedTags.includes(textLower)) return;

    setAddedTags((prevTags) => [...prevTags, textLower]);
    clearInput();
  }

  const deleteTag = (tag: string) => {
    setAddedTags((prevTags) => prevTags.filter((t) => t !== tag));
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
      <STagListContainer>
        {addedTags.map((t) => (
          <TagPill tag={t} key={t} handleDelete={deleteTag} />
        ))}
      </STagListContainer>
      <SDropdownList>
        {dropdownItems()?.map((t) => 
          <SDropdownItem
            key={t}
            onClick={() => handleAddTag(t)}
          >{t}</SDropdownItem>)}
      </SDropdownList>
    </SInputContainer>
  );
};

const SInputContainer = styled.div`
  position: relative;
`;

const STagListContainer = styled.ul`
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
`;

const SDropdownList = styled.ul`
  background: ${theme.colors.gray[100]};
  list-style-type: none;
  position: absolute;
  top: 1rem;
  left: 0;
  width: 30rem;
`;

const SDropdownItem = styled.li`
  border: 1px solid ${theme.colors.gray[500]};
  cursor: pointer;
  padding: ${theme.spacing.sm};
`;
