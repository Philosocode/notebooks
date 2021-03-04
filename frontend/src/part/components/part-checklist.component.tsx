import React from "react";
import styled from "styled-components";

import { IPartChecklist } from "../redux/part.types";

import { theme } from "../../shared/styles/theme.style";
import { SCheckboxLabel } from "../../shared/styles/form.style";
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";

interface IProps {
  checklist: IPartChecklist;
}
export const PartChecklist: React.FC<IProps> = ({
  checklist
}) => {
  return (
    <SForm>
      <SHeadingSubSubtitle>Part Checklist</SHeadingSubSubtitle>
      {
        Object.keys(checklist).map(key => (
          <SCheckboxLabel>
            {key}
            <input
              type="checkbox"
              id={key}
              name={key}
              onChange={() => { checklist[key] = !checklist[key] }}
              checked={checklist[key]}
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