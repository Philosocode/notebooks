import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";

// logic
import { selectConcepts, selectCurrentConcept } from "concept/redux/concept.selectors";
import { setCurrentConceptId } from "concept/redux/concept.slice";

// components
import { ConceptDetailHeader } from "concept/components/concept-detail-header.component";
import { ConceptHooks } from "hook/components/concept-hooks.component";
import { ConceptLinks } from "../components/concept-links.component";
import { Tabs } from "shared/components/nav/tabs.component";
import { Tab } from "shared/components/nav/tab.component";

// styles
import { SDetailPageContent } from "shared/styles/layout.style";
import { showAndHideAlert } from "../../alert/redux/alert.thunks";

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
    const conceptExists = concepts.some((c) => c.id === conceptId);

    conceptExists
      ? dispatch(setCurrentConceptId(conceptId))
      : dispatch(showAndHideAlert({
          message: "Concept with that ID not found.",
          type: "warning",
        }));
    // eslint-disable-next-line
  }, [conceptId, dispatch]);

  if (!currentConcept) return null;
  return (
    <SDetailPageContent>
      <ConceptDetailHeader concept={currentConcept} />
      <Tabs>
        <Tab title="Hooks">
          <ConceptHooks concept={currentConcept} />
        </Tab>
        <Tab title="Materials">Materials</Tab>
        <Tab title="Concept Links">
          <ConceptLinks concept={currentConcept} />
        </Tab>
      </Tabs>
    </SDetailPageContent>
  );
};