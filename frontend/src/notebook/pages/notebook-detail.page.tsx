import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";

// logic
import { selectCurrentNotebook, selectNotebookHash } from "notebook/redux/notebook.selectors";
import { selectNotebooksLoaded } from "shared/redux/init.selectors";
import { getNotebooks } from "notebook/redux/notebook.thunks";
import { setCurrentNotebookId } from "notebook/redux/notebook.slice";
import { showAndHideAlert } from "alert/redux/alert.thunks";

// components
import { ConceptLinksForNotebook } from "../components/concept-links-for-notebook.component";
import { FlashcardsForNotebook } from "../components/flashcards-for-notebook.component";
import { NotebookDetailHeader } from "notebook/components/notebook-detail-header.component";
import { SectionList } from "section/components/section-list.component";
import { TabNames } from "shared/components/nav/tab-names.component";
import { Tab } from "shared/components/nav/tab.component";

// styles
import { SDetailPageContent } from "shared/styles/layout.style";

interface IMatchParams {
  notebookId: string;
}
export const NotebookDetailPage: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const notebookHash = useSelector(selectNotebookHash);
  const currentNotebook = useSelector(selectCurrentNotebook);
  const notebooksLoaded = useSelector(selectNotebooksLoaded);
  const { notebookId } = useParams<IMatchParams>();

  const tabNames = ["Sections", "Flashcards", "Concept Links"];
  const [selectedTab, setSelectedTab] = useState(tabNames[0]);

  useEffect(() => {
    if (currentNotebook?.id === notebookId) return;

    if (!notebooksLoaded) {
      dispatch(getNotebooks());
      return
    }

    const notebookExists = notebookHash.hasOwnProperty(notebookId);
    if (notebookExists) {
      dispatch(setCurrentNotebookId(notebookId));
      setSelectedTab(tabNames[0]);
    } else {
      dispatch(showAndHideAlert({
        message: "Notebook with that ID not found.",
        type: "warning",
      }));
    }
    // eslint-disable-next-line
  }, [notebooksLoaded, notebookId, dispatch]);

  if (!currentNotebook) return null;
  return (
    <SDetailPageContent>
      <NotebookDetailHeader notebook={currentNotebook} />
      <TabNames tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <Tab title="Sections" selectedTab={selectedTab}>
          <SectionList notebookId={notebookId} />
        </Tab>
        <Tab title="Flashcards" selectedTab={selectedTab}>
          <FlashcardsForNotebook notebook={currentNotebook} />
        </Tab>
        <Tab title="Concept Links" selectedTab={selectedTab}>
          <ConceptLinksForNotebook notebook={currentNotebook} />
        </Tab>
      </div>
    </SDetailPageContent>
  );
}