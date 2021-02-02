import { selectConceptTags } from "concept/redux/concept.selectors";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SInputBorderless } from "shared/styles/form.styles";

import { theme } from "shared/styles/theme.styles";
import styled from "styled-components";
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    const textLower = text.toLowerCase();

    // don't add tag if it's already added
    if (addedTags.includes(textLower)) return;

    setAddedTags((prevTags) => [...prevTags, textLower]);
    clearInput();
  };

  const deleteTag = (tag: string) => {
    setAddedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <SContainer>
      <div>
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
      </div>
      <SDropdownContainer></SDropdownContainer>
    </SContainer>
  );
};

const SContainer = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const STagListContainer = styled.ul`
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
`;

const SDropdownContainer = styled.ul`
  list-style-type: none;
`;
