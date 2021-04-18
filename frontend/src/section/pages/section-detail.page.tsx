import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// logic
import { selectCurrentSection, selectSectionHash } from "../redux/section.selectors";
import { setCurrentSectionId } from "../redux/section.slice";
import { getSection } from "../redux/section.thunks";
import { getNotes } from "../../note/redux/note.thunks";

// components
import { ConceptSectionLinks } from "../components/concept-section-links.component";
import { SectionDetailHeader } from "../components/section-detail-header.component";
import { TabNames } from "../../shared/components/nav/tab-names.component";
import { Tab } from "../../shared/components/nav/tab.component";
import { SectionChecklist } from "../components/section-checklist.component";
import { NoteList } from "../../note/components/note-list.component";
import { FlashcardList } from "flashcard/components/flashcard-list.component";

// styles
import { SDetailPageContent } from "shared/styles/layout.style";

interface IMatchParams {
  sectionId: string;
}
export const SectionDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const sectionHash = useSelector(selectSectionHash);
  const currentSection = useSelector(selectCurrentSection);

  const { sectionId } = useParams<IMatchParams>();

  const tabNames = ["Notes", "Flashcards", "Concept Links"];
  const [selectedTab, setSelectedTab] = useState(tabNames[0]);

  useEffect(() => {
    if (currentSection?.id === sectionId) return;

    const sectionExists = sectionHash.hasOwnProperty(sectionId);
    if (sectionExists) {
      dispatch(setCurrentSectionId(sectionId));
      setSelectedTab("Notes");
    } else {
      dispatch(getSection(sectionId));
      dispatch(setCurrentSectionId(sectionId));
    }
  }, [currentSection, sectionHash, sectionId, dispatch]);

  useEffect(() => {
    if (!currentSection) return;

    if (!currentSection.noteIds) {
      dispatch(getNotes(sectionId));
    }
  }, [currentSection, dispatch, sectionId]);

  if (!currentSection?.noteIds) return null;
  return (
    <SDetailPageContent>
      <SectionDetailHeader section={currentSection} />

      <TabNames tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <Tab title="Notes" selectedTab={selectedTab}>
          <SectionChecklist section={currentSection} />
          <NoteList sectionId={currentSection.id} />
        </Tab>
        <Tab title="Flashcards" selectedTab={selectedTab}>
          <FlashcardList sectionId={sectionId} />
        </Tab>
        <Tab title="Concept Links" selectedTab={selectedTab}>
          <ConceptSectionLinks section={currentSection} />
        </Tab>
      </div>
    </SDetailPageContent>
  );
 };