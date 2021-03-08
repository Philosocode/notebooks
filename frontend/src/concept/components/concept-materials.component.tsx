import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IConcept } from "../redux/concept.types";
import { ILinkGridItem } from "../../shared/components/link/link-grid-item.component";
import { getMaterials } from "../../material/redux/material.thunks";
import { selectMaterials } from "../../material/redux/material.selectors";
import { selectMaterialsLoaded } from "../../shared/redux/init.selectors";
import { getMaterialLinksForConcept } from "../../concept-link/redux/concept-link.thunks";

// components
import { LinkGrid } from "../../shared/components/link/link-grid.component";

// styles
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";

interface IProps {
  concept: IConcept;
}
export const ConceptMaterials: React.FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();
  const materials = useSelector(selectMaterials);
  const materialsLoaded = useSelector(selectMaterialsLoaded);
  const { materialIds } = concept;

  useEffect(() => {
    if (!materialsLoaded) {
      dispatch(getMaterials());
    }
  }, [materialsLoaded, dispatch]);

  useEffect(() => {
    if (!materialsLoaded) return;

    if (!materialIds) {
      dispatch(getMaterialLinksForConcept(concept.id));
    }
  }, [materialIds, concept.id, materialsLoaded, dispatch]);

  const materialLinks = useMemo(() => {
    const uniqueMaterialIds = Array.from(new Set(materialIds ?? []));
    const links: ILinkGridItem[] = [];

    uniqueMaterialIds.forEach(id => {
      const material = materials.find(material => material.id === id);
      if (material) links.push({
        currentId: concept.id,
        otherId: material.id,
        name: material.name,
        url: `/materials/${material.id}`
      });
    });

    return links;
  }, [materialIds, concept.id, materials]);

  if (!materialIds) return null;
  return (
    <div>
      <div>
        {
          materialIds.length === 0 && (
            <SHeadingSubSubtitle weight={500}>No links found.</SHeadingSubSubtitle>
          )
        }
        <LinkGrid links={materialLinks} />
      </div>

    </div>
  );
}