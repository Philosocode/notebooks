import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { IPart } from "../redux/part.types";
import { updatePartChecklist } from "../redux/part.thunks";

import { theme } from "../../shared/styles/theme.style";
import { SCheckboxLabel } from "../../shared/styles/form.style";
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";

interface IProps {
  part: IPart;
}
export const PartChecklist: React.FC<IProps> = ({
  part
}) => {
  const dispatch = useDispatch();

  function updateChecklist(event: React.ChangeEvent<HTMLInputElement>, key: string) {
    dispatch(updatePartChecklist({
      partId: part.id,
      key,
      value: event.target.checked,
    }));
  }

  return (
    <SForm>
      <SHeadingSubSubtitle>Part Checklist</SHeadingSubSubtitle>
      {
        Object.keys(part.checklist).map(key => (
          <SCheckboxLabel key={key}>
            {key}
            <input
              type="checkbox"
              id={key}
              name={key}
              onChange={(event) => updateChecklist(event, key)}
              checked={part.checklist[key]}
            />
            <span />
          </SCheckboxLabel>
        ))
      }
    </SForm>
  );
}

const SForm = styled.form`
  border-radius: 3px;
  box-shadow: ${theme.boxShadows.light};
  max-width: 50rem;
  margin-top: ${theme.spacing.base};
  margin-bottom: -${theme.spacing.sm};
  padding: ${theme.spacing.md};
`;