import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { updateConceptTag } from "concept/redux/concept-tag.thunk";

// components
import { FormGroup } from "shared/components/form/form-group.component";

// styles
import { theme } from "shared/styles/theme.styles";
import { SHeadingSubtitle } from "shared/styles/typography.styles";
import { SButtonGreen } from "shared/styles/button.styles";
import { IModalProps } from "modal/redux/modal.types";

interface IProps extends IModalProps {
  oldTagName: string;
}
export const UpdateTagModal: FC<IProps> = ({ oldTagName, handleClose }) => {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState(oldTagName);

  // derived state
  const buttonDisabled = function() {
    const trimmedTagName = tagName.trim().toLowerCase();
    return trimmedTagName === "" || trimmedTagName === oldTagName;
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTagName(event.target.value);
  }

  // functions
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateConceptTag({ oldTagName, newTagName: tagName }));
    handleClose();
  }

  return (
    <SContent>
      <SHeadingSubtitle>Update Tag</SHeadingSubtitle>
      <SForm autoComplete="off" onSubmit={handleSubmit}>
        <FormGroup
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Tag Name"
          value={tagName}
        />
        <SButton disabled={buttonDisabled()}>Update</SButton>
      </SForm>
    </SContent>
  );
 };

const SContent = styled.div`
  max-width: 35rem;
`;

const SForm = styled.form`
  margin-top: ${theme.spacing.base};
`;

const SButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.md};
`;