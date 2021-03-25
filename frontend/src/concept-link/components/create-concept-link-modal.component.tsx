import React, { useMemo, useState } from "react";
import styled from "styled-components";

// logic
import { IModalProps } from "modal/redux/modal.types";

// components
import { ModalWrapper } from "../../modal/components/modal-wrapper.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle, SHeadingSubtitle } from "shared/styles/typography.style";
import { SInputBorderless } from "shared/styles/form.style";

interface IEntity {
  id: string;
  name: string;
}
interface IProps extends IModalProps {
  handleCreate: (otherId: string) => void;
  modalShowing: boolean;
  unlinkedEntities: IEntity[];
}
export const CreateConceptLinkModal: React.FC<IProps> = ({
  handleClose,
  handleCreate,
  modalShowing,
  unlinkedEntities,
}) => {
  const [filterText, setFilterText] = useState("");

  const filteredEntities = useMemo(() => {
    const filterTextLowerTrimmed = filterText.trim().toLowerCase();
    if (!filterTextLowerTrimmed) return unlinkedEntities;

    return unlinkedEntities.filter(
      entity => entity.name.toLowerCase().includes(filterTextLowerTrimmed)
    );
  }, [unlinkedEntities, filterText]);

  function handleFilterTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterText(event.target.value);
  }

  function handleClick(otherId: string) {
    handleCreate(otherId);

    handleClose();
  }

  return (
    <ModalWrapper isShowing={modalShowing} handleClose={handleClose}>
      <SHeadingSubtitle>Create Concept Link</SHeadingSubtitle>
      <SInput value={filterText} onChange={handleFilterTextChange} placeholder="Filter by name" />
      <SLinks>
        {filteredEntities.length === 0 && (
          <SNoLinksHeading weight={500}>No links found...</SNoLinksHeading>
        )}
        {filteredEntities.map(entity => (
          <SLinkItem
            key={entity.id}
            onClick={() => handleClick(entity.id)}
          >{entity.name}</SLinkItem>
        ))}
      </SLinks>
    </ModalWrapper>
  );
};

const SLinks = styled.div`
  display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    column-gap: ${theme.spacing.md};
    row-gap: ${theme.spacing.base};
  margin-top: ${theme.spacing.base};
  text-align: center;
`;

const SNoLinksHeading = styled(SHeadingSubSubtitle)`
  grid-column: 1 / -1;
  font-weight: 500;
  text-align: left;
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