import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import shuffle from "lodash/shuffle";
import random from "lodash/random";
import styled from "styled-components";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { IFact } from "../../fact/redux/fact.types";
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
import { updateFact } from "../../fact/redux/fact.thunks";

export const PracticePage: React.FC = () => {
  const practiceState = useSelector(selectPracticeState);
  const history = useHistory();
  const dispatch = useDispatch();

  const [facts, setFacts] = useState<IFact[]>();
  const [currentFactIndex, setCurrentFactIndex] = useState(-1);
  const [answerShowing, toggleAnswerShowing] = useToggle(false);
  const { values, handleChange, setValues } = useForm({ responseText: "" });

  useEffect(() => {
    // if Redux state missing, exit
    if (!practiceState.source) {
      return history.push("/materials");
    }

    // don't load facts if already loaded
    if (facts !== undefined) {
      return;
    }

    interface IFactsResponse {
      data: {
        facts: IFact[];
      };
    }

    let requestUrl: string;
    switch(practiceState.source) {
      case "all":
        requestUrl = "/facts?mastered=false";
        break;
      case "material":
        requestUrl = `/materials/${practiceState.id}/facts?mastered=false`;
        break;
      case "part":
        requestUrl = `/parts/${practiceState.id}/facts?mastered=false`;
        break;
    }

    api.get<IFactsResponse>(requestUrl)
      .then(response => {
        const rawFacts = response.data.data.facts;

        setFacts(shuffle(rawFacts));
        setCurrentFactIndex(0);
      });
  }, [practiceState, facts, history]);

  function handleSuccess() {
    setCurrentFactIndex(prevState => prevState + 1);

    handleToggle();
  }

  function handleFailure() {
    if (!facts) return;

    // if current fact is the last item, do nothing
    if (currentFactIndex === facts.length - 1) {
      return handleToggle();
    }

    // choose a random index in range(current+1, end of array)
    let randomIndex = currentFactIndex;
    while (randomIndex === currentFactIndex) {
      // keep looping until a different index is found
      randomIndex = random(currentFactIndex+1, facts.length - 1);
    }

    const factsCopy = [...facts];
    const temp = factsCopy[currentFactIndex];
    factsCopy[currentFactIndex] = factsCopy[randomIndex];
    factsCopy[randomIndex] = temp;

    // update facts array
    setFacts(factsCopy);

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
    if (currentFactIndex === 0) return;
    handleToggle();

    setCurrentFactIndex(prevState => prevState - 1);
  }

  function handleMasteredClick() {
    if (!facts) return;
    const fact = facts[currentFactIndex];

    dispatch(updateFact({
      factId: fact.id,
      partId: fact.part_id,
      updates: {
        mastered: true
      }
    }));

    // after mastering a fact, remove it
    const updatedFacts = [...facts];
    updatedFacts.splice(currentFactIndex, 1);

    setFacts(updatedFacts);

    if (answerShowing) {
      handleToggle();
    }
  }

  // render
  function getNoFactsHeading() {
    if (facts?.length !== 0) return;

    return (
      <SCenterContainer>
        <SDoneHeading weight={500}>No flashcards found...</SDoneHeading>
        <SShowAnswerButton onClick={handleGoBack}>Exit</SShowAnswerButton>
      </SCenterContainer>
    );
  }

  function getStudyHeadingText() {
    if (practiceState.source === "material") return "Studying flashcards in notebook";
    if (practiceState.source === "part") return "Studying flashcards in section";

    return "Studying all flashcards";
  }

  function getPracticeScreen() {
    if (!facts) return;
    const currentFact = facts[currentFactIndex];

    return (
      <>
        <STextContainer>
          <SStudyHeading>{getStudyHeadingText()}</SStudyHeading>
          <SMasteredIcon icon={faStar} handleClick={handleMasteredClick} />
          <STextCompact>{currentFactIndex + 1} / {facts.length}</STextCompact>
          <SPartNameLink as={Link} to={`/parts/${currentFact.part_id}`}>{currentFact.part_name}</SPartNameLink>
          <SQuestionHeading>Question:</SQuestionHeading>
          <SText>{currentFact.question}</SText>

          { answerShowing ? (
            <>
              <SAnswerHeading>Answer:</SAnswerHeading>
              <SMarkdownStyles>
                <ReactMarkdown source={currentFact.answer} />
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
                <SButton disabled={currentFactIndex === 0} onClick={handlePrevious}>Previous</SButton>
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

  if (!facts || currentFactIndex === -1) return <Loader />;
  return (
    <SContainer>
      { facts.length === 0 && getNoFactsHeading() }
      { facts.length > 0 && currentFactIndex < facts.length && getPracticeScreen() }
      { facts.length > 0 && currentFactIndex === facts.length && getFinishedScreen() }
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

const SPartNameLink = styled(STextCompact)`
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

