import React from "react";
import { useDispatch } from "react-redux";

// logic
import { IConcept } from "../redux/concept.types";
import { showModal } from "modal/redux/modal.slice";
import { deleteTagFromConcept } from "concept/redux/concept.thunks";

// components
import { DetailHeader } from "shared/components/info/detail-header.component";
import { TagList } from "../../tag/components/tag-list.component";

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
    <DetailHeader
      name={concept.name}
      updatedAt={concept.updated_at}
      showUpdateModal={showUpdateModal}
      bottomSlot={<TagList tags={concept.tags} handleDeleteTag={handleDeleteTag} />}
    />
  );
};