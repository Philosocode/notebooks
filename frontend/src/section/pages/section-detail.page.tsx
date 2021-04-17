import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// logic
import { selectCurrentPart, selectPartHash } from "../redux/section.selectors";
import { setCurrentPartId } from "../redux/section.slice";
import { getPart } from "../redux/section.thunks";
import { getNotes } from "../../note/redux/note.thunks";

// components
import { ConceptSectionLinks } from "../components/concept-section-links.component";
import { PartDetailHeader } from "../components/section-detail-header.component";
import { TabNames } from "../../shared/components/nav/tab-names.component";
import { Tab } from "../../shared/components/nav/tab.component";
import { PartChecklist } from "../components/section-checklist.component";
import { NoteList } from "../../note/components/note-list.component";
import { FactList } from "fact/components/fact-list.component";

// styles
import { SDetailPageContent } from "shared/styles/layout.style";

interface IMatchParams {
  sectionId: string;
}
export const SectionDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const sectionHash = useSelector(selectPartHash);
  const currentPart = useSelector(selectCurrentPart);

  const { sectionId } = useParams<IMatchParams>();

  const tabNames = ["Notes", "Flashcards", "Concept Links"];
  const [selectedTab, setSelectedTab] = useState(tabNames[0]);

  useEffect(() => {
    if (currentPart?.id === sectionId) return;

    const sectionExists = sectionHash.hasOwnProperty(sectionId);
    if (sectionExists) {
      dispatch(setCurrentPartId(sectionId));
      setSelectedTab("Notes");
    } else {
      dispatch(getPart(sectionId));
      dispatch(setCurrentPartId(sectionId));
    }
  }, [currentPart, sectionHash, sectionId, dispatch]);

  useEffect(() => {
    if (!currentPart) return;

    if (!currentPart.noteIds) {
      dispatch(getNotes(sectionId));
    }
  }, [currentPart, dispatch, sectionId]);

  if (!currentPart?.noteIds) return null;
  return (
    <SDetailPageContent>
      <PartDetailHeader section={currentPart} />

      <TabNames tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <Tab title="Notes" selectedTab={selectedTab}>
          <PartChecklist section={currentPart} />
          <NoteList sectionId={currentPart.id} />
        </Tab>
        <Tab title="Flashcards" selectedTab={selectedTab}>
          <FactList sectionId={sectionId} />
        </Tab>
        <Tab title="Concept Links" selectedTab={selectedTab}>
          <ConceptSectionLinks section={currentPart} />
        </Tab>
      </div>
    </SDetailPageContent>
  );
 };