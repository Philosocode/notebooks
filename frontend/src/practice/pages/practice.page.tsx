import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import shuffle from "lodash/shuffle";
import random from "lodash/random";
import styled from "styled-components";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { IFlashcard } from "../../flashcard/redux/flashcard.types";
import { api } from "../../services/api.service";
import { selectPracticeState } from "../redux/practice.selectors";
import { useToggle } from "../../shared/hooks/use-toggle.hook";

import { CircleIcon } from "../../shared/components/button/circle-icon.component";
import { Loader } from "loading/components/loader.component";

import { theme } from "../../shared/styles/theme.style";
import { SPageContentCenter } from "../../shared/styles/layout.style";
import { SHeadingSubtitle } from "../../shared/styles/typography.style";
import { SButtonGreen, SButtonRed, SButton } from "shared/styles/button.style";
import { STextareaBase } from "shared/styles/form.style";
import { useForm } from "../../shared/hooks/use-form.hook";
import { updateFlashcard } from "../../flashcard/redux/flashcard.thunks";

export const PracticePage: React.FC = () => {
  const practiceState = useSelector(selectPracticeState);
  const history = useHistory();
  const dispatch = useDispatch();

  const [flashcards, setFlashcards] = useState<IFlashcard[]>();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(-1);
  const [answerShowing, toggleAnswerShowing] = useToggle(false);
  const { values, handleChange, setValues } = useForm({ responseText: "" });

  useEffect(() => {
    // if Redux state missing, exit
    if (!practiceState.source) {
      return history.push("/materials");
    }

    // don't load flashcards if already loaded
    if (flashcards !== undefined) {
      return;
    }

    interface IFlashcardsResponse {
      data: {
        flashcards: IFlashcard[];
      };
    }

    let requestUrl: string;
    switch(practiceState.source) {
      case "all":
        requestUrl = "/flashcards?mastered=false";
        break;
      case "material":
        requestUrl = `/materials/${practiceState.id}/flashcards?mastered=false`;
        break;
      case "section":
        requestUrl = `/sections/${practiceState.id}/flashcards?mastered=false`;
        break;
    }

    api.get<IFlashcardsResponse>(requestUrl)
      .then(response => {
        const rawFlashcards = response.data.data.flashcards;

        setFlashcards(shuffle(rawFlashcards));
        setCurrentFlashcardIndex(0);
      });
  }, [practiceState, flashcards, history]);

  function handleSuccess() {
    setCurrentFlashcardIndex(prevState => prevState + 1);

    handleToggle();
  }

  function handleFailure() {
    if (!flashcards) return;

    // if current flashcard is the last item, do nothing
    if (currentFlashcardIndex === flashcards.length - 1) {
      return handleToggle();
    }

    // choose a random index in range(current+1, end of array)
    let randomIndex = currentFlashcardIndex;
    while (randomIndex === currentFlashcardIndex) {
      // keep looping until a different index is found
      randomIndex = random(currentFlashcardIndex+1, flashcards.length - 1);
    }

    const flashcardsCopy = [...flashcards];
    const temp = flashcardsCopy[currentFlashcardIndex];
    flashcardsCopy[currentFlashcardIndex] = flashcardsCopy[randomIndex];
    flashcardsCopy[randomIndex] = temp;

    // update flashcards array
    setFlashcards(flashcardsCopy);

    // swap the items
    handleToggle();
  }

  function handleGoBack() {
    history.goBack();
  }

  function handleToggle() {
    setValues({ responseText: "" });
    toggleAnswerShowing();
  }

  function handlePrevious() {
    if (currentFlashcardIndex === 0) return;
    handleToggle();

    setCurrentFlashcardIndex(prevState => prevState - 1);
  }

  function handleMasteredClick() {
    if (!flashcards) return;
    const flashcard = flashcards[currentFlashcardIndex];

    dispatch(updateFlashcard({
      flashcardId: flashcard.id,
      sectionId: flashcard.section_id,
      updates: {
        mastered: true
      }
    }));

    // after mastering a flashcard, remove it
    const updatedFlashcards = [...flashcards];
    updatedFlashcards.splice(currentFlashcardIndex, 1);

    setFlashcards(updatedFlashcards);

    if (answerShowing) {
      handleToggle();
    }
  }

  // render
  function getNoFlashcardsHeading() {
    if (flashcards?.length !== 0) return;

    return (
      <SCenterContainer>
        <SDoneHeading weight={500}>No flashcards found...</SDoneHeading>
        <SShowAnswerButton onClick={handleGoBack}>Exit</SShowAnswerButton>
      </SCenterContainer>
    );
  }

  function getStudyHeadingText() {
    if (practiceState.source === "material") return "Studying flashcards in notebook";
    if (practiceState.source === "section") return "Studying flashcards in note";

    return "Studying all flashcards";
  }

  function getPracticeScreen() {
    if (!flashcards) return;
    const currentFlashcard = flashcards[currentFlashcardIndex];

    return (
      <>
        <STextContainer>
          <SStudyHeading>{getStudyHeadingText()}</SStudyHeading>
          <SMasteredIcon icon={faStar} handleClick={handleMasteredClick} />
          <STextCompact>{currentFlashcardIndex + 1} / {flashcards.length}</STextCompact>
          <SSectionNameLink as={Link} to={`/sections/${currentFlashcard.section_id}`}>{currentFlashcard.section_name}</SSectionNameLink>
          <SQuestionHeading>Question:</SQuestionHeading>
          <SText>{currentFlashcard.question}</SText>

          { answerShowing ? (
            <>
              <SAnswerHeading>Answer:</SAnswerHeading>
              <SMarkdownStyles>
                <ReactMarkdown source={currentFlashcard.answer} />
              </SMarkdownStyles>
            </>
          ) : (
            <>
              <SAnswerHeading>Response:</SAnswerHeading>
              <STextarea
                name="responseText"
                placeholder="Type in your response..."
                onChange={handleChange}
                value={values.responseText}
              />
            </>
          )}
        </STextContainer>

        <SButtons>
          {
            answerShowing ? (
              <>
                <SButton disabled={currentFlashcardIndex === 0} onClick={handlePrevious}>Previous</SButton>
                <SButtonGreen onClick={handleSuccess}>Success</SButtonGreen>
                <SButtonRed onClick={handleFailure}>Fail</SButtonRed>
              </>
            ) : (
              <SShowAnswerButton
                onClick={toggleAnswerShowing}
                disabled={values.responseText.length < 5}
              >Show Answer</SShowAnswerButton>
            )
          }
        </SButtons>
      </>
    );
  }

  function getFinishedScreen() {
    return (
      <SCenterContainer>
        <SDoneHeading weight={500}>You are finished studying!</SDoneHeading>
        <SShowAnswerButton onClick={handleGoBack}>Exit</SShowAnswerButton>
      </SCenterContainer>
    )
  }

  if (!flashcards || currentFlashcardIndex === -1) return <Loader />;
  return (
    <SContainer>
      { flashcards.length === 0 && getNoFlashcardsHeading() }
      { flashcards.length > 0 && currentFlashcardIndex < flashcards.length && getPracticeScreen() }
      { flashcards.length > 0 && currentFlashcardIndex === flashcards.length && getFinishedScreen() }
    </SContainer>
  );
}

const SContainer = styled(SPageContentCenter)`
  display: flex;
    flex-direction: column;
    justify-content: space-between;
  height: calc(100vh - ${theme.componentSizes.navbarHeight});
  padding: ${theme.spacing.base} ${theme.spacing.base};
  position: relative;
  
  ${theme.media.tabLand} {
    padding: ${theme.spacing.lg};
  }
`;

const SMasteredIcon = styled(CircleIcon)`
  font-size: 2rem;
  position: absolute;
    right: 0;
`;

const STextContainer = styled.div`
  overflow: auto;
  position: relative;
  margin-bottom: ${theme.spacing.base};
`;
const STextarea = styled(STextareaBase)`
  padding: ${theme.spacing.sm};
  margin-top: ${theme.spacing.xs};
`;

const STextCompact = styled.h3`
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const SStudyHeading = styled(STextCompact)`
  color: ${theme.colors.gray[300]};
  font-size: ${theme.fontSizes.sm};
  letter-spacing: 2px;
  margin-bottom: ${theme.spacing.base};
  text-align: center;
`;

const SDoneHeading = styled(SHeadingSubtitle)`
  margin-bottom: ${theme.spacing.base};
`;

const SQuestionHeading = styled(SHeadingSubtitle)`
  margin-top: ${theme.spacing.sm};
`;

const SAnswerHeading = styled(SHeadingSubtitle)`
  margin-top: ${theme.spacing.md};
`;

const SText = styled.p`
  font-size: ${theme.fontSizes.basePlus};
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.md};
  }
`;

const SButtons = styled.div`
  display: flex;
    justify-content: space-between;
  max-width: 100vw;

  & > button {
    ${theme.media.tabPort} {
      width: 12rem;
    }
  }
`;

const SShowAnswerButton = styled(SButtonGreen)`
  margin: 0 auto;
  width: 15rem !important;
`;

const SCenterContainer = styled.div`
  text-align: center;
`;

const SSectionNameLink = styled(STextCompact)`
  font-weight: bold;
  text-decoration: underline;
  
  &:hover {
    color: ${theme.colors.green[400]};
  }
`;

const SMarkdownStyles = styled.div`
  & > h1 {
    font-size: ${theme.fontSizes.lg};
    font-weight: 800;
    margin-bottom: -${theme.spacing.sm};
    
    ${theme.media.tabLand} {
      font-size: ${theme.fontSizes.xl};
    }
  }
  
  & img {
    max-width: 100%;
  }

  & > h2 {
    border-bottom: 1px solid ${theme.colors.gray};
    font-size: ${theme.fontSizes.md};
    padding-top: ${theme.spacing.base};
    padding-bottom: 5px;
    
    ${theme.media.tabLand} {
      font-size: ${theme.fontSizes.lg};
      padding-top: ${theme.spacing.md};
    }
  }

  & > p, & > ul, & > ol {
    margin-top: ${theme.spacing.sm};
    font-size: ${theme.fontSizes.basePlus};

    ${theme.media.tabLand} {
      font-size: ${theme.fontSizes.md};
    }
  }
  
  & > p:first-child {
    margin-top: 0;
  }

  & > ul, & > ol {
    list-style-type: inherit;
    padding-left: 1.8rem;
  }

  & a {
    text-decoration: underline;
  }
`

