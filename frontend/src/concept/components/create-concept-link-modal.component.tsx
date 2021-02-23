import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// logic
import { IConcept } from "concept/redux/concept.types";
import { IModalProps } from "modal/redux/modal.types";
import { selectConcepts } from "concept/redux/concept.selectors";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle, SHeadingSubtitle } from "shared/styles/typography.style";
import { SInputBorderless } from "shared/styles/form.style";
import { createConceptLink } from "../redux/concept.thunks";

interface IProps extends IModalProps {
  currentConcept: IConcept;
}
export const CreateConceptLinkModal: React.FC<IProps> = ({ currentConcept, handleClose }) => {
  const dispatch = useDispatch();
  const concepts = useSelector(selectConcepts);
  const [filterText, setFilterText] = useState("");

  const getUnlinkedConcepts = useCallback(() => {
    const currentLinks = currentConcept.links;
    if (!currentLinks) return concepts;

    const unlinkedConcepts = concepts.filter(concept => {
      if (concept.id === currentConcept.id) return false;

      // don't include if current concept's links include this concept's ID
      return !currentLinks.some(link => link.concept_id === concept.id)
    }).sort((a, b) => {
      if (a.name > b.name) return 1;
      return -1;
    });

    const filterTextLowerTrimmed = filterText.toLowerCase();
    if (!filterTextLowerTrimmed) return unlinkedConcepts;

    return unlinkedConcepts.filter(
      concept => concept.name.toLowerCase().includes(filterTextLowerTrimmed)
    );
  }, [concepts, currentConcept, filterText]);

  function handleFilterTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterText(event.target.value);
  }

  function handleConceptClick(otherConceptId: string) {
    dispatch(createConceptLink({
      currentConceptId: currentConcept.id,
      otherConceptId: otherConceptId
    }));

    handleClose();
  }

  const unlinkedConcepts = getUnlinkedConcepts();
  return (
    <SContent>
      <SHeadingSubtitle>Create Concept Link</SHeadingSubtitle>
      <SInput value={filterText} onChange={handleFilterTextChange} placeholder="Filter by name" />
      <SLinks>
        {unlinkedConcepts.length === 0 && (
          <SHeadingSubSubtitle weight={500}>No concepts found...</SHeadingSubSubtitle>
        )}
        {unlinkedConcepts.map(concept => (
          <SLinkItem
            key={concept.id}
            onClick={() => handleConceptClick(concept.id)}
          >{concept.name}</SLinkItem>
        ))}
      </SLinks>
    </SContent>
  );
};

const SContent = styled.div``;

const SLinks = styled.div`
  display: grid;
    grid-template-columns: repeat(auto-fill, 20rem);
    column-gap: ${theme.spacing.md};
    row-gap: ${theme.spacing.base};
  margin-top: ${theme.spacing.base};
  text-align: center;
`;

const SLinkItem = styled.div`
  box-shadow: ${theme.boxShadows.light};
  cursor: pointer;
  font-weight: 500;
  padding: ${theme.spacing.base};
  
  &:hover {
    background: ${theme.colors.green[400]};
    color: ${theme.colors.white};
  }
`;

const SInput = styled(SInputBorderless)`
  max-width: 40rem;
  margin-top: ${theme.spacing.base};
`;