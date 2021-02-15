import React, { FC } from "react";

import { IConcept } from "concept/redux/concept.types";
import { SHeadingSubtitle } from "shared/styles/typography.style";

interface IProps {
  concept: IConcept;
}
export const ConceptDetailHeader: FC<IProps> = ({ concept }) => {
  return (
    <div>
      <SHeadingSubtitle>{concept.name}</SHeadingSubtitle>
      <div>Created: {concept.created_at.toUTCString()}</div>
      <div>Last Updated: {concept.updated_at.toUTCString()}</div>
    </div>
  )
}