import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory, useLocation, useParams } from "react-router-dom";

import { selectConcepts, selectCurrentConcept } from "concept/redux/concept.selectors";
import { getConcept } from "concept/redux/concept.thunks";
import { setCurrentConcept } from "concept/redux/concept.slice";

import { ConceptDetailHeader } from "concept/components/concept-detail-header.component";
import { Tabs } from "shared/components/nav/tabs.component";
import { Tab } from "shared/components/nav/tab.component";

import { SDetailPageContent } from "shared/styles/layout.style";
import { FloatingAddButton } from "shared/components/button/floating-add-button.component";
import { selectModalShowing } from "modal/redux/modal.selectors";
import { ConceptHooks } from "hook/components/concept-hooks.component";

interface IMatchParams {
  conceptId: string;
}
export const ConceptDetailPage: FC<RouteComponentProps> = () => {
  const concepts = useSelector(selectConcepts);
  const currentConcept = useSelector(selectCurrentConcept);
  const modalShowing = useSelector(selectModalShowing);
  const dispatch = useDispatch();
  const params = useParams<IMatchParams>();
  const location = useLocation();
  const history = useHistory();

  const { conceptId } = params;

  useEffect(() => {
    const currentConcept = concepts.find((c) => c.id === conceptId);

    // concept not available locally
    // try fetching from server
    currentConcept
      ? dispatch(setCurrentConcept(currentConcept))
      : dispatch(getConcept(conceptId));

  }, [concepts, conceptId, dispatch]);

  function handleAddClick() {
    if (!modalShowing)
      history.push(`${location.pathname}/hooks/create`);
  }

  if (!currentConcept) return <div>Loading...</div>
  return (
    <SDetailPageContent>
      <ConceptDetailHeader concept={currentConcept} />
      <Tabs>
        <Tab title="Hooks"><ConceptHooks /></Tab>
        <Tab title="Materials">Materials</Tab>
        <Tab title="Concept Links">Concept Links</Tab>
      </Tabs>
    </SDetailPageContent>
  );
};