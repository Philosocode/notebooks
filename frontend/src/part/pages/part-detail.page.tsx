import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// logic
import { selectCurrentPart, selectPartHash } from "../redux/part.selectors";
import { setCurrentPartId } from "../redux/part.slice";
import { getPart } from "../redux/part.thunks";
import { getNotes } from "../../note/redux/note.thunks";

// components
import { ConceptParts } from "../components/concept-parts.component";
import { PartDetailHeader } from "../components/part-detail-header.component";
import { TabNames } from "../../shared/components/nav/tab-names.component";
import { Tab } from "../../shared/components/nav/tab.component";
import { PartChecklist } from "../components/part-checklist.component";
import { NoteList } from "../../note/components/note-list.component";
import { FactList } from "fact/components/fact-list.component";

// styles
import { SDetailPageContent } from "shared/styles/layout.style";

interface IMatchParams {
  partId: string;
}
export const PartDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const partHash = useSelector(selectPartHash);
  const currentPart = useSelector(selectCurrentPart);

  const { partId } = useParams<IMatchParams>();

  const tabNames = ["Notes", "Flashcards", "Concept Links"];
  const [selectedTab, setSelectedTab] = useState(tabNames[0]);

  useEffect(() => {
    if (currentPart?.id === partId) return;

    const partExists = partHash.hasOwnProperty(partId);
    if (partExists) {
      dispatch(setCurrentPartId(partId));
      setSelectedTab("Notes");
    } else {
      dispatch(getPart(partId));
      dispatch(setCurrentPartId(partId));
    }
  }, [currentPart, partHash, partId, dispatch]);

  useEffect(() => {
    if (!currentPart) return;

    if (!currentPart.noteIds) {
      dispatch(getNotes(partId));
    }
  }, [currentPart, dispatch, partId]);

  if (!currentPart?.noteIds) return null;
  return (
    <SDetailPageContent>
      <PartDetailHeader part={currentPart} />

      <TabNames tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <Tab title="Notes" selectedTab={selectedTab}>
          <PartChecklist part={currentPart} />
          <NoteList partId={currentPart.id} />
        </Tab>
        <Tab title="Flashcards" selectedTab={selectedTab}>
          <FactList partId={partId} />
        </Tab>
        <Tab title="Concept Links" selectedTab={selectedTab}>
          <ConceptParts part={currentPart} />
        </Tab>
      </div>
    </SDetailPageContent>
  );
 };