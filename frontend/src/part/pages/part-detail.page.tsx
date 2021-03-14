import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// logic
import { selectCurrentPart, selectPartHash } from "../redux/part.selectors";
import { setCurrentPartId } from "../redux/part.slice";
import { getPart } from "../redux/part.thunks";
import { getSections } from "../../section/redux/section.thunks";

// components
import { PartDetailHeader } from "../components/part-detail-header.component";
import { TabNames } from "../../shared/components/nav/tab-names.component";
import { Tab } from "../../shared/components/nav/tab.component";
import { PartChecklist } from "../components/part-checklist.component";
import { SectionList } from "../../section/components/section-list.component";

// styles
import { SDetailPageContent } from "shared/styles/layout.style";
import { ConceptParts } from "../components/concept-parts.component";

interface IMatchParams {
  partId: string;
}
export const PartDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const partHash = useSelector(selectPartHash);
  const currentPart = useSelector(selectCurrentPart);

  const { partId } = useParams<IMatchParams>();

  const tabNames = ["Sections", "Facts", "Concept Links"];
  const [selectedTab, setSelectedTab] = useState(tabNames[0]);

  useEffect(() => {
    if (currentPart?.id === partId) return;

    const partExists = partHash.hasOwnProperty(partId);
    if (partExists) {
      dispatch(setCurrentPartId(partId));
      setSelectedTab("Sections");
    } else {
      dispatch(getPart(partId));
      dispatch(setCurrentPartId(partId));
    }
  }, [currentPart, partHash, partId, dispatch]);

  useEffect(() => {
    if (!currentPart) return;

    if (!currentPart.sectionIds) {
      dispatch(getSections(partId));
    }
  }, [currentPart, dispatch, partId]);

  if (!currentPart?.sectionIds) return null;
  return (
    <SDetailPageContent>
      <PartDetailHeader part={currentPart} />

      <TabNames tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <Tab title="Sections" selectedTab={selectedTab}>
          <PartChecklist part={currentPart} />
          <SectionList partId={currentPart.id} />
        </Tab>
        <Tab title="Facts" selectedTab={selectedTab}>

        </Tab>
        <Tab title="Concept Links" selectedTab={selectedTab}>
          <ConceptParts part={currentPart} />
        </Tab>
      </div>
    </SDetailPageContent>
  );
 };