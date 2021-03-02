import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";

// logic
import { selectCurrentMaterial, selectMaterials } from "material/redux/material.selectors";
import { selectMaterialsLoaded } from "shared/redux/init.selectors";
import { getMaterials } from "material/redux/material.thunks";
import { setCurrentMaterialId } from "material/redux/material.slice";
import { showAndHideAlert } from "alert/redux/alert.thunks";

// components
import { TabNames } from "shared/components/nav/tab-names.component";
import { MaterialDetailHeader } from "material/components/material-detail-header.component";

// styles
import { SDetailPageContent } from "shared/styles/layout.style";
import { Tab } from "shared/components/nav/tab.component";
import { PartList } from "part/components/part-list.component";

interface IMatchParams {
  materialId: string;
}
export const MaterialDetailPage: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const materials = useSelector(selectMaterials);
  const currentMaterial = useSelector(selectCurrentMaterial);
  const materialsLoaded = useSelector(selectMaterialsLoaded);
  const { materialId } = useParams<IMatchParams>();

  const tabNames = ["Parts", "Facts", "Concept Links"];
  const [selectedTab, setSelectedTab] = useState("Parts");

  useEffect(() => {
    if (currentMaterial?.id === materialId) return;

    if (!materialsLoaded) {
      dispatch(getMaterials());
      return
    }

    const materialExists = materials.some((m) => m.id === materialId);
    if (materialExists) {
      dispatch(setCurrentMaterialId(materialId));
      setSelectedTab("Parts");
    } else {
      dispatch(showAndHideAlert({
        message: "Material with that ID not found.",
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
        <Tab title="Parts" selectedTab={selectedTab}><PartList materialId={materialId} /></Tab>
        <Tab title="Facts" selectedTab={selectedTab}>Facts</Tab>
        <Tab title="Concept Links" selectedTab={selectedTab}>Concept Links</Tab>
      </div>
    </SDetailPageContent>
  );
}