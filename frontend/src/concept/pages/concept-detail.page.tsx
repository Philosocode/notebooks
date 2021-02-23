import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";

// logic
import { selectConcepts, selectCurrentConcept } from "concept/redux/concept.selectors";
import { setCurrentConceptId } from "concept/redux/concept.slice";

// components
import { ConceptDetailHeader } from "concept/components/concept-detail-header.component";
import { ConceptHooks } from "hook/components/concept-hooks.component";
import { ConceptLinks } from "../components/concept-links.component";
import { TabNames } from "shared/components/nav/tab-names.component";
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

  const tabNames = ["Hooks", "Materials", "Concept Links"];
  const [selectedTab, setSelectedTab] = useState("Hooks");

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

      <TabNames tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <Tab title="Hooks" selectedTab={selectedTab}>
          <ConceptHooks concept={currentConcept} />
        </Tab>
        <Tab title="Materials" selectedTab={selectedTab}>Materials</Tab>
        <Tab title="Concept Links" selectedTab={selectedTab}>
          <ConceptLinks concept={currentConcept} />
        </Tab>
      </div>
    </SDetailPageContent>
  );
};