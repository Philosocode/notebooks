import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";

import { selectConcepts, selectCurrentConcept } from "concept/redux/concept.selectors";
import { getConcept } from "concept/redux/concept.thunks";
import { setCurrentConcept } from "concept/redux/concept.slice";
import { SDetailPageContent } from "shared/styles/layout.style";
import { ConceptDetailHeader } from "concept/components/concept-detail-header.component";

interface IMatchParams {
  conceptId: string;
}
export const ConceptDetailPage: FC<RouteComponentProps> = () => {
  const concepts = useSelector(selectConcepts);
  const currentConcept = useSelector(selectCurrentConcept);
  const dispatch = useDispatch();
  const params = useParams<IMatchParams>();
  const { conceptId } = params;

  useEffect(() => {
    const currentConcept = concepts.find((c) => c.id === conceptId);

    // concept not available locally
    // try fetching from server
    currentConcept
      ? dispatch(setCurrentConcept(currentConcept))
      : dispatch(getConcept(conceptId));

  }, [concepts, conceptId, dispatch]);

  if (!currentConcept) return <div>Loading...</div>
  return (
    <SDetailPageContent>
      <ConceptDetailHeader concept={currentConcept} />
    </SDetailPageContent>
  );
};
