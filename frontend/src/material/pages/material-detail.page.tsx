import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";

// logic
import { selectCurrentMaterial, selectMaterialHash } from "material/redux/material.selectors";
import { selectMaterialsLoaded } from "shared/redux/init.selectors";
import { getMaterials } from "material/redux/material.thunks";
import { setCurrentMaterialId } from "material/redux/material.slice";
import { showAndHideAlert } from "alert/redux/alert.thunks";

// components
import { ConceptLinksForMaterial } from "../components/concept-links-for-material.component";
import { FactsForMaterial } from "../components/facts-for-material.component";
import { MaterialDetailHeader } from "material/components/material-detail-header.component";
import { PartList } from "part/components/part-list.component";
import { TabNames } from "shared/components/nav/tab-names.component";
import { Tab } from "shared/components/nav/tab.component";

// styles
import { SDetailPageContent } from "shared/styles/layout.style";

interface IMatchParams {
  materialId: string;
}
export const MaterialDetailPage: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const materialHash = useSelector(selectMaterialHash);
  const currentMaterial = useSelector(selectCurrentMaterial);
  const materialsLoaded = useSelector(selectMaterialsLoaded);
  const { materialId } = useParams<IMatchParams>();

  const tabNames = ["Sections", "Flashcards", "Concept Links"];
  const [selectedTab, setSelectedTab] = useState(tabNames[0]);

  useEffect(() => {
    if (currentMaterial?.id === materialId) return;

    if (!materialsLoaded) {
      dispatch(getMaterials());
      return
    }

    const materialExists = materialHash.hasOwnProperty(materialId);
    if (materialExists) {
      dispatch(setCurrentMaterialId(materialId));
      setSelectedTab(tabNames[0]);
    } else {
      dispatch(showAndHideAlert({
        message: "Notebook with that ID not found.",
        type: "warning",
      }));
    }
    // eslint-disable-next-line
  }, [materialsLoaded, materialId, dispatch]);

  if (!currentMaterial) return null;
  return (
    <SDetailPageContent>
      <MaterialDetailHeader material={currentMaterial} />
      <TabNames tabNames={tabNames} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        <Tab title="Sections" selectedTab={selectedTab}>
          <PartList materialId={materialId} />
        </Tab>
        <Tab title="Flashcards" selectedTab={selectedTab}>
          <FactsForMaterial material={currentMaterial} />
        </Tab>
        <Tab title="Concept Links" selectedTab={selectedTab}>
          <ConceptLinksForMaterial material={currentMaterial} />
        </Tab>
      </div>
    </SDetailPageContent>
  );
}