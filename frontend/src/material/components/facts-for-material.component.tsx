import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExpand } from "@fortawesome/free-solid-svg-icons";

// logic
import { IMaterial } from "../redux/material.types";
import { IFact } from "fact/redux/fact.types";
import { api } from "../../services/api.service";
import { deleteFact, updateFact } from "../../fact/redux/fact.thunks";
import { useExpandHash } from "shared/hooks/use-expand-hash.hook";

// components
import { FloatingCornerButton } from "../../shared/components/button/floating-corner-button.component";
import { EditableContentBox } from "../../shared/components/info/editable-content-box.component";

// theme
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { CircleIcon } from "../../shared/components/button/circle-icon.component";

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
  const dispatch = useDispatch();

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

  function handleUpdate(factId: string, question?: string, answer?: string) {
    if (!factsForMaterial) return;

    const updates = { question, answer };
    const factIndex = factsForMaterial.findIndex(f => f.id === factId);
    const fact = factsForMaterial[factIndex];

    dispatch(updateFact({ partId: fact.part_id, factId, updates }));

    updateLocalFact(factId, updates);
  }

  function handleDelete(factId: string) {
    if (!factsForMaterial) return;

    const factIndex = factsForMaterial.findIndex(f => f.id === factId);
    const factToUpdate = factsForMaterial[factIndex];

    dispatch(deleteFact({ factId, partId: factToUpdate.part_id }));

    setFactsForMaterial(factsForMaterial.filter(f => f.id !== factId));
  }

  function toggleFactMastered(fact: IFact) {
    if (!factsForMaterial) return;

    const newValue = !fact.mastered;

    dispatch(updateFact({
      partId: fact.part_id,
      factId: fact.id,
      updates: { mastered: newValue }
    }));

    updateLocalFact(fact.id, { mastered: newValue });
  }

  function updateLocalFact(id: string, updates: { question?: string; answer?: string; mastered?: boolean; }) {
    if (!factsForMaterial) return;

    const factIndex = factsForMaterial.findIndex(f => f.id === id);
    const facts = [ ...factsForMaterial ];
    const fact = {
      ...facts[factIndex],
      ...updates,
    };
    facts[factIndex] = fact;

    setFactsForMaterial(facts);
  }

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
                <EditableContentBox
                  key={fact.id}
                  entityId={fact.id}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  index={index}
                  content={fact.answer}
                  title={fact.question}
                  isExpanded={expandedHash[fact.id]}
                  toggleIsExpanded={toggleEntityExpansion}
                  headerSlot={
                    <SIcon
                      icon={faCheck}
                      mastered={fact.mastered}
                      handleClick={() => toggleFactMastered(fact)}
                    />
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

interface IMastered {
  mastered: boolean;
}
const SIcon = styled(CircleIcon)<IMastered>`
  color: ${props => props.mastered ? theme.colors.green[300] : theme.colors.gray[500]};
  font-size: ${theme.fontSizes.base};
  margin-left: 3px;
`;
