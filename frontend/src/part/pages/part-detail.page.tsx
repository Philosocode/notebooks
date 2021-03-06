import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { SDetailPageContent } from "shared/styles/layout.style";
import { getMaterials } from "material/redux/material.thunks";
import { showAndHideAlert } from "alert/redux/alert.thunks";
import { selectCurrentPart, selectPartHash } from "../redux/part.selectors";
import { setCurrentPartId } from "../redux/part.slice";
import { PartDetailHeader } from "../components/part-detail-header.component";
import { TabNames } from "../../shared/components/nav/tab-names.component";
import { Tab } from "../../shared/components/nav/tab.component";
import { PartChecklist } from "../components/part-checklist.component";
import { getPart } from "../redux/part.thunks";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import { UpdateNamedEntityModal } from "../../shared/components/modal/update-named-entity.modal";
import { ModalWrapper } from "../../modal/components/modal-wrapper.component";

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
  }, [currentPart, partId, dispatch]);

  if (!currentPart) return null;
  return (
    <SDetailPageContent>
      <PartDetailHeader part={currentPart} />

      <TabNames tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <Tab title="Sections" selectedTab={selectedTab}>
          <PartChecklist part={currentPart} />
          <div>
            Sections
          </div>
        </Tab>
        <Tab title="Facts" selectedTab={selectedTab}>Facts</Tab>
        <Tab title="Concept Links" selectedTab={selectedTab}>Concept Links</Tab>
      </div>
    </SDetailPageContent>
  );
 };