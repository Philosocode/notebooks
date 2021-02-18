import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";

import { selectConcepts, selectCurrentConcept } from "concept/redux/concept.selectors";
import { getConcept } from "concept/redux/concept.thunks";
import { setCurrentConceptId } from "concept/redux/concept.slice";

import { ConceptDetailHeader } from "concept/components/concept-detail-header.component";
import { Tabs } from "shared/components/nav/tabs.component";
import { Tab } from "shared/components/nav/tab.component";

import { SDetailPageContent } from "shared/styles/layout.style";
import { ConceptHooks } from "hook/components/concept-hooks.component";

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

    if (currentConcept) {
      dispatch(setCurrentConceptId(currentConcept.id))
    } else {
      // concept not available locally
      // try fetching from server
      dispatch(getConcept(conceptId));
    }
  }, [conceptId, dispatch]);

  if (!currentConcept) return <div>Loading...</div>
  return (
    <SDetailPageContent>
      <ConceptDetailHeader concept={currentConcept} />
      <Tabs>
        <Tab title="Hooks">
          <ConceptHooks concept={currentConcept} />
        </Tab>
        <Tab title="Materials">Materials</Tab>
        <Tab title="Concept Links">Concept Links</Tab>
      </Tabs>
    </SDetailPageContent>
  );
};