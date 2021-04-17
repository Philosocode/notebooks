import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";

// logic
import { selectConceptHash, selectCurrentConcept } from "concept/redux/concept.selectors";
import { showAndHideAlert } from "../../alert/redux/alert.thunks";
import { getConcepts } from "../redux/concept.thunks";
import { selectConceptsLoaded } from "shared/redux/init.selectors";
import { setCurrentConceptId } from "concept/redux/concept.slice";

// components
import { ConceptDetailHeader } from "concept/components/concept-detail-header.component";
import { ConceptHooks } from "hook/components/concept-hooks.component";
import { ConceptNotebookLinks } from "../components/concept-notebook-links.component";
import { ConceptLinks } from "../components/concept-links.component";
import { TabNames } from "shared/components/nav/tab-names.component";
import { Tab } from "shared/components/nav/tab.component";

// styles
import { SDetailPageContent } from "shared/styles/layout.style";

interface IMatchParams {
  conceptId: string;
}
export const ConceptDetailPage: FC<RouteComponentProps> = () => {
  const concepts = useSelector(selectConceptHash);
  const currentConcept = useSelector(selectCurrentConcept);
  const dispatch = useDispatch();
  const params = useParams<IMatchParams>();
  const conceptsLoaded = useSelector(selectConceptsLoaded);

  const tabNames = ["Hooks", "Notebooks", "Concept Links"];
  const [selectedTab, setSelectedTab] = useState("Hooks");

  const { conceptId } = params;


  useEffect(() => {
    if (!conceptsLoaded) {
      dispatch(getConcepts());
      return
    }

    if (currentConcept?.id === conceptId) return;

    const conceptExists = concepts.hasOwnProperty(conceptId);
    if (conceptExists) {
      dispatch(setCurrentConceptId(conceptId));
      setSelectedTab("Hooks");
    } else {
      dispatch(showAndHideAlert({
        message: "Concept with that ID not found.",
        type: "warning",
      }));
    }
    // eslint-disable-next-line
  }, [conceptsLoaded, conceptId, dispatch]);

  if (!currentConcept) return null;
  return (
    <SDetailPageContent>
      <ConceptDetailHeader concept={currentConcept} />

      <TabNames tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <Tab title="Hooks" selectedTab={selectedTab}>
          <ConceptHooks concept={currentConcept} />
        </Tab>
        <Tab title="Notebooks" selectedTab={selectedTab}>
          <ConceptNotebookLinks concept={currentConcept} />
        </Tab>
        <Tab title="Concept Links" selectedTab={selectedTab}>
          <ConceptLinks concept={currentConcept} />
        </Tab>
      </div>
    </SDetailPageContent>
  );
};