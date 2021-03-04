import React from "react";
import { useDispatch } from "react-redux";

// logic
import { IConcept } from "../redux/concept.types";
import { showModal } from "modal/redux/modal.slice";
import { deleteTagFromConcept } from "concept/redux/concept.thunks";

// styles
import { DetailHeaderWithTags } from "../../shared/components/info/detail-header-with-tags.component";

interface IProps {
  concept: IConcept
}
export const ConceptDetailHeader: React.FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();

  function showUpdateModal() {
    dispatch(
      showModal({
        modalType: "update-concept",
        modalProps: { concept },
      })
    );
  }

  function handleDeleteTag(tag: string) {
    dispatch(deleteTagFromConcept({ tagName: tag, conceptId: concept.id }));
  }

  return (
    <DetailHeaderWithTags
      name={concept.name}
      updatedAt={concept.updated_at}
      tags={concept.tags}
      handleDeleteTag={handleDeleteTag}
      showUpdateModal={showUpdateModal}
    />
  );
};