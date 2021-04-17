import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faCheck, faExpand } from "@fortawesome/free-solid-svg-icons";

// logic
import { INotebook } from "../redux/notebook.types";
import { IFlashcard } from "flashcard/redux/flashcard.types";
import { api } from "../../services/api.service";
import { deleteFlashcard, updateFlashcard } from "../../flashcard/redux/flashcard.thunks";
import { useExpandHash } from "shared/hooks/use-expand-hash.hook";

// components
import { FloatingCornerButton } from "../../shared/components/button/floating-corner-button.component";
import { EditableContentBox } from "../../shared/components/info/editable-content-box.component";

// theme
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { CircleIcon } from "../../shared/components/button/circle-icon.component";

interface IProps {
  notebook: INotebook;
}
export const FlashcardsForNotebook: React.FC<IProps> = ({ notebook }) => {
  interface IFlashcardHash {
    [key: string]: IFlashcard[];
  }
  // key: section name, value: list of flashcards
  const [flashcardsForNotebook, setFlashcardsForNotebook] = useState<IFlashcard[]>();
  const {
    expandedHash,
    toggleEntityExpansion,
    toggleAllExpansions,
  } = useExpandHash(flashcardsForNotebook ?? [], false);
  const dispatch = useDispatch();

  // fetch flashcards for notebook
  useEffect(() => {
    if (!flashcardsForNotebook) {
      interface IGetFlashcardsForNotebookResponse {
        status: string;
        data: {
          flashcards: IFlashcard[];
        };
      }
      api.get<IGetFlashcardsForNotebookResponse>(`/notebooks/${notebook.id}/flashcards`)
        .then(response => {
          const { flashcards } = response.data.data;
          setFlashcardsForNotebook(flashcards);
        });
    }
  }, [notebook.id, flashcardsForNotebook]);

  function handleUpdate(flashcardId: string, question?: string, answer?: string) {
    if (!flashcardsForNotebook) return;

    const updates = { question, answer };
    const flashcardIndex = flashcardsForNotebook.findIndex(f => f.id === flashcardId);
    const flashcard = flashcardsForNotebook[flashcardIndex];

    dispatch(updateFlashcard({ sectionId: flashcard.section_id, flashcardId, updates }));

    updateLocalFlashcard(flashcardId, updates);
  }

  function handleDelete(flashcardId: string) {
    if (!flashcardsForNotebook) return;

    const flashcardIndex = flashcardsForNotebook.findIndex(f => f.id === flashcardId);
    const flashcardToUpdate = flashcardsForNotebook[flashcardIndex];

    dispatch(deleteFlashcard({ flashcardId, sectionId: flashcardToUpdate.section_id }));

    setFlashcardsForNotebook(flashcardsForNotebook.filter(f => f.id !== flashcardId));
  }

  function toggleFlashcardMastered(flashcard: IFlashcard) {
    if (!flashcardsForNotebook) return;

    const newValue = !flashcard.mastered;

    dispatch(updateFlashcard({
      sectionId: flashcard.section_id,
      flashcardId: flashcard.id,
      updates: { mastered: newValue }
    }));

    updateLocalFlashcard(flashcard.id, { mastered: newValue });
  }

  function updateLocalFlashcard(id: string, updates: { question?: string; answer?: string; mastered?: boolean; }) {
    if (!flashcardsForNotebook) return;

    const flashcardIndex = flashcardsForNotebook.findIndex(f => f.id === id);
    const flashcards = [ ...flashcardsForNotebook ];
    const flashcard = {
      ...flashcards[flashcardIndex],
      ...updates,
    };
    flashcards[flashcardIndex] = flashcard;

    setFlashcardsForNotebook(flashcards);
  }

  const flashcardHash = useMemo(() => {
    return flashcardsForNotebook?.reduce<IFlashcardHash>((hash, flashcard) => {
      if (!hash[flashcard.section_name]) {
        hash[flashcard.section_name] = [];
      }

      hash[flashcard.section_name].push(flashcard);

      return hash;
    }, {})
  }, [flashcardsForNotebook]);

  if (!flashcardsForNotebook || !flashcardHash) return null;

  return (
    <SContainer>
      { flashcardsForNotebook.length === 0 && <SHeadingSubSubtitle weight={500}>No flashcards found.</SHeadingSubSubtitle> }

      {
        Object.keys(flashcardHash).map((sectionName, index) => (
          <SFlashcardList key={sectionName + index}>
            <SSectionHeading
              as={Link}
              to={`/sections/${flashcardHash[sectionName][0].section_id}`}
            >{sectionName}: {flashcardHash[sectionName].length} Flashcard{flashcardHash[sectionName].length > 1 && "s"}</SSectionHeading>
            <SList>
              {flashcardHash[sectionName].map((flashcard, index) => (
                <EditableContentBox
                  key={flashcard.id}
                  entityId={flashcard.id}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  index={index}
                  content={flashcard.answer}
                  title={flashcard.question}
                  isExpanded={expandedHash[flashcard.id]}
                  toggleIsExpanded={toggleEntityExpansion}
                  headerSlot={
                    <SIcon
                      icon={faCheck}
                      mastered={flashcard.mastered}
                      handleClick={() => toggleFlashcardMastered(flashcard)}
                    />
                  }
                />
              ))
              }
            </SList>
          </SFlashcardList>
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

const SFlashcardList = styled.div`
  margin-top: ${theme.spacing.lg};
`;

const SSectionHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
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
