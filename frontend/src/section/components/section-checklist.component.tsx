import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { ISection } from "../redux/section.types";
import { updateSectionChecklist } from "../redux/section.thunks";

import { theme } from "../../shared/styles/theme.style";
import { SCheckboxLabel } from "../../shared/styles/form.style";
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";

interface IProps {
  section: ISection;
}
export const SectionChecklist: React.FC<IProps> = ({
  section
}) => {
  const dispatch = useDispatch();

  function updateChecklist(event: React.ChangeEvent<HTMLInputElement>, key: string) {
    dispatch(updateSectionChecklist({
      sectionId: section.id,
      key,
      value: event.target.checked,
    }));
  }

  return (
    <SForm>
      <SHeadingSubSubtitle>Checklist</SHeadingSubSubtitle>
      {
        Object.keys(section.checklist).reverse().map(key => (
          <SCheckboxLabel key={key}>
            {key}
            <input
              type="checkbox"
              id={key}
              name={key}
              onChange={(event) => updateChecklist(event, key)}
              checked={section.checklist[key]}
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
  padding: ${theme.spacing.base};

  ${theme.media.tabLand} {
    padding: ${theme.spacing.md};
  }
`;