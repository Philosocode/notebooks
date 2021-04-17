import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { ISection } from "../redux/section.types";

import { DetailHeader } from "shared/components/info/detail-header.component";
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { UpdateNamedEntityModal } from "shared/components/modal/update-named-entity.modal";
import { deleteSection, updateSection } from "../redux/section.thunks";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import styled from "styled-components";
import { theme } from "../../shared/styles/theme.style";

interface IProps {
  section: ISection;
}
export const SectionDetailHeader: React.FC<IProps> = ({ section }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalShowing, toggleModalShowing] = useToggle(false);

  function handleUpdate(newName: string) {
    dispatch(updateSection({
      sectionId: section.id,
      notebookId: section.notebook_id,
      name: newName
    }));
  }

  function handleDelete() {
    dispatch(
      deleteSection({
        notebookId: section.notebook_id,
        section
      })
    );

    history.push("/notebooks/" + section.notebook_id);
  }

  return (
    <>
      <DetailHeader
        name={section.name}
        updatedAt={section.updated_at}
        showUpdateModal={toggleModalShowing}
        topSlot={<SLink to={`/notebooks/${section.notebook_id}`}>Back to Notebook</SLink>}
      />
      <ModalWrapper isShowing={modalShowing} handleClose={toggleModalShowing}>
        <UpdateNamedEntityModal
          currentName={section.name}
          entityName="Section"
          updateEntity={handleUpdate}
          deleteEntity={handleDelete}
          handleClose={toggleModalShowing}
        />
      </ModalWrapper>
    </>
  )
}

const SLink = styled(Link)`
  text-decoration: underline;
  
  &:hover {
    color: ${theme.colors.green[400]};
  }
`;