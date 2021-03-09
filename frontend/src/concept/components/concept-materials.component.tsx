import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IConcept } from "../redux/concept.types";
import { ILinkGridItem } from "../../shared/components/link/link-grid-item.component";
import { api } from "services/api.service";
import { getMaterials } from "../../material/redux/material.thunks";
import { selectMaterials } from "../../material/redux/material.selectors";
import { selectMaterialsLoaded } from "../../shared/redux/init.selectors";

// components
import { LinkGrid } from "../../shared/components/link/link-grid.component";

// styles
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";

interface IGetMaterialLinksResponse {
  status: string;
  data: {
    materialLinks: string[];
  };
}
interface IProps {
  concept: IConcept;
}
export const ConceptMaterials: React.FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();
  const materials = useSelector(selectMaterials);
  const materialsLoaded = useSelector(selectMaterialsLoaded);

  const [materialIds, setMaterialIds] = useState<string[]>();

  useEffect(() => {
    if (!materialsLoaded) {
      dispatch(getMaterials());
    }

    if (!materialIds) {
      api.get<IGetMaterialLinksResponse>(`/concepts/${concept.id}/links?materials`)
        .then(response => {
          setMaterialIds(response.data.data.materialLinks)
        });
    }

  }, [materialsLoaded, materialIds, concept, dispatch]);

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