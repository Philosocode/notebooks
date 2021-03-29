import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExpand } from "@fortawesome/free-solid-svg-icons";

// logic
import { IMaterial } from "../redux/material.types";
import { IFact } from "fact/redux/fact.types";
import { api } from "../../services/api.service";
import { useExpandHash } from "shared/hooks/use-expand-hash.hook";

// components
import { ContentBox } from "shared/components/info/content-box.component";

// theme
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { FloatingCornerButton } from "../../shared/components/button/floating-corner-button.component";

interface IProps {
  material: IMaterial;
}
export const FactsForMaterial: React.FC<IProps> = ({ material }) => {
  interface IFactHash {
    [key: string]: IFact[];
  }
  // key: part name, value: list of facts
  const [factsForMaterial, setFactsForMaterial] = useState<IFact[]>();
  const {
    expandedHash,
    toggleEntityExpansion,
    toggleAllExpansions,
  } = useExpandHash(factsForMaterial ?? [], false);

  // fetch facts for material
  useEffect(() => {
    if (!factsForMaterial) {
      interface IGetFactsForMaterialResponse {
        status: string;
        data: {
          facts: IFact[];
        };
      }
      api.get<IGetFactsForMaterialResponse>(`/materials/${material.id}/facts`)
        .then(response => {
          const { facts } = response.data.data;
          setFactsForMaterial(facts);
        });
    }
  }, [material.id, factsForMaterial]);

  const factHash = useMemo(() => {
    return factsForMaterial?.reduce<IFactHash>((hash, fact) => {
      if (!hash[fact.part_name]) {
        hash[fact.part_name] = [];
      }

      hash[fact.part_name].push(fact);

      return hash;
    }, {})
  }, [factsForMaterial]);

  if (!factsForMaterial || !factHash) return null;

  return (
    <SContainer>
      { factsForMaterial.length === 0 && <SHeadingSubSubtitle weight={500}>No facts found.</SHeadingSubSubtitle> }

      {
        Object.keys(factHash).map((partName, index) => (
          <SFactList key={partName + index}>
            <SPartHeading
              as={Link}
              to={`/parts/${factHash[partName][0].part_id}`}
            >{partName}: {factHash[partName].length} Fact(s)</SPartHeading>
            <SList>
              {factHash[partName].map((fact, index) => (
                <ContentBox
                  key={fact.id}
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
            </SList>
          </SFactList>
        ))
      }
      <FloatingCornerButton handleClick={toggleAllExpansions} icon={faExpand} />
    </SContainer>
  );
}

const SContainer = styled.div`
  margin: 0 auto;
  margin-top: ${theme.spacing.md};
  text-align: center;
  max-width: 80rem;
`;

const SFactList = styled.div`
  margin-top: ${theme.spacing.lg};
`;

const SPartHeading = styled(SHeadingSubSubtitle)`
  display: inline-block;
  text-decoration: underline;
  
  &:hover {
    color: ${theme.colors.green[400]};
  }
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