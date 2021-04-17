import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IConcept } from "../redux/concept.types";
import { ILinkGridItem } from "../../shared/components/link/link-grid-item.component";
import { api } from "services/api.service";
import { getNotebooks } from "../../notebook/redux/notebook.thunks";
import { selectNotebookHash } from "../../notebook/redux/notebook.selectors";
import { selectNotebooksLoaded } from "../../shared/redux/init.selectors";

// components
import { LinkGrid } from "../../shared/components/link/link-grid.component";

// styles
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";

interface IGetNotebookLinksResponse {
  status: string;
  data: {
    notebookLinks: string[];
  };
}
interface IProps {
  concept: IConcept;
}
export const ConceptNotebookLinks: React.FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();
  const notebookHash = useSelector(selectNotebookHash);
  const notebooksLoaded = useSelector(selectNotebooksLoaded);
  const [notebookIds, setNotebookIds] = useState<string[]>();

  useEffect(() => {
    if (!notebooksLoaded) {
      dispatch(getNotebooks());
    }

    if (!notebookIds) {
      api.get<IGetNotebookLinksResponse>(`/concepts/${concept.id}/links?notebooks`)
        .then(response => {
          setNotebookIds(response.data.data.notebookLinks)
        });
    }
  }, [notebooksLoaded, notebookIds, concept, dispatch]);

  const notebookLinks = useMemo(() => {
    const uniqueNotebookIds = Array.from(new Set(notebookIds ?? []));
    const links: ILinkGridItem[] = [];

    uniqueNotebookIds.forEach(id => {
      const notebook = notebookHash[id];
      
      links.push({
        currentId: concept.id,
        otherId: notebook.id,
        name: notebook.name,
        url: `/notebooks/${notebook.id}`
      });
    });

    return links;
  }, [notebookHash, concept.id, notebookIds]);

  if (!notebookLinks) return null;
  return (
    <div>
      <div>
        {
          notebookLinks.length === 0 && (
            <SHeadingSubSubtitle weight={500}>No links found.</SHeadingSubSubtitle>
          )
        }
        <LinkGrid links={notebookLinks} />
      </div>

    </div>
  );
}