import React, { useEffect, useState } from "react";
import styled from "styled-components";

// logic
import { IMaterial } from "../redux/material.types";
import { IFact } from "fact/redux/fact.types";
import { api } from "../../services/api.service";
import { useExpandHash } from "../../shared/hooks/use-expand-hash.hook";

// components
import { ContentBox } from "../../shared/components/info/content-box.component";

// theme
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { FloatingCornerButton } from "../../shared/components/button/floating-corner-button.component";
import { faCheck, faExpand } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../shared/styles/theme.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IGetFactsForMaterialResponse {
  status: string;
  data: {
    facts: IFact[];
  };
}
interface IProps {
  material: IMaterial;
}
export const FactsForMaterial: React.FC<IProps> = ({ material }) => {
  const [factsForMaterial, setFactsForMaterial] = useState<IFact[]>();

  const { expandedHash, toggleEntityExpansion, toggleAllExpansions } = useExpandHash(factsForMaterial ?? [], false);

  // fetch facts for material
  useEffect(() => {
    if (!factsForMaterial) {
      api.get<IGetFactsForMaterialResponse>(`/materials/${material.id}/facts`)
        .then(response => setFactsForMaterial(response.data.data.facts));
    }
  }, [material.id]);

  if (!factsForMaterial) return null;
  return (
    <SContainer>
      <SHeadingSubSubtitle># Facts: {factsForMaterial.length}</SHeadingSubSubtitle>

      { factsForMaterial.length === 0 && <SHeadingSubSubtitle weight={500}>No facts found.</SHeadingSubSubtitle> }
      <SList>
        { factsForMaterial.map((fact, index) => (
            <ContentBox
              entityId={fact.id}
              index={index}
              title={fact.question}
              content={fact.answer}
              isExpanded={expandedHash[fact.id]}
              toggleIsExpanded={toggleEntityExpansion}
              headerSlot={
                <SStarContainer mastered={fact.mastered}>
                  <SIcon icon={faCheck} />
                </SStarContainer>
              }
            />
          ))
        }
        <FloatingCornerButton handleClick={toggleAllExpansions} icon={faExpand} />
      </SList>
    </SContainer>
  );
}

const SContainer = styled.div`
  margin: 0 auto;
  margin-top: ${theme.spacing.md};
  text-align: center;
  max-width: 80rem;
`;

const SList = styled.ul`
  margin-top: ${theme.spacing.base};
`;

const SIcon = styled(FontAwesomeIcon)``;

interface SStarContainerProps {
  mastered: boolean;
}
const SStarContainer = styled.div<SStarContainerProps>`
  color: ${props => props.mastered ? theme.colors.green[300] : theme.colors.gray[500]};
  display: flex;
    align-items: center;
    justify-content: center;
  margin-left: ${theme.spacing.xs};
  position: relative;

  border-radius: 50%;
  height: 3rem;
  width: 3rem;
`;