import React, { useEffect } from "react";

import { IConcept } from "../redux/concept.types";
import { useDispatch, useSelector } from "react-redux";

import { selectConceptLinks } from "../redux/concept.selectors";
import { getConceptLinks } from "../redux/concept.thunks";

interface IProps {
  concept: IConcept;
}
export const ConceptLinks: React.FC<IProps> = ({ concept }) => {
  const conceptLinks = useSelector(selectConceptLinks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (conceptLinks === undefined) {
      dispatch(getConceptLinks(concept.id));
    }
  }, [conceptLinks, dispatch]);

  return (
    <>
      {
        conceptLinks?.map(concept => (
          <>
            <div>{concept.id}</div>
            <div>{concept.name}</div>
          </>
        ))
      }
    </>
  )
}