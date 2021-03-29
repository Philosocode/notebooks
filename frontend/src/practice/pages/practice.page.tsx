import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import shuffle from "lodash/shuffle";
import random from "lodash/random";
import styled from "styled-components";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { IFact } from "../../fact/redux/fact.types";
import { api } from "../../services/api.service";
import { selectPracticeState } from "../redux/practice.selectors";
import { setPracticeState } from "../redux/practice.slice";
import { useToggle } from "../../shared/hooks/use-toggle.hook";

import { CircleIcon } from "../../shared/components/button/circle-icon.component";
import { Loader } from "loading/components/loader.component";

import { theme } from "../../shared/styles/theme.style";
import { SPageContentCenter } from "../../shared/styles/layout.style";
import { SHeadingSubtitle } from "../../shared/styles/typography.style";
import { SButtonGreen, SButtonRed, SButton } from "shared/styles/button.style";
import { STextareaBase } from "shared/styles/form.style";
import { useForm } from "../../shared/hooks/use-form.hook";

export const PracticePage: React.FC = () => {
  const practiceState = useSelector(selectPracticeState);
  const history = useHistory();
  const dispatch = useDispatch();

  const [facts, setFacts] = useState<IFact[]>();
  const [currentFactIndex, setCurrentFactIndex] = useState(-1);
  const [totalFacts, setTotalFacts] = useState(0);
  const [answerShowing, toggleAnswerShowing] = useToggle(false);
  const { values, handleChange, setValues } = useForm({ responseText: "" });

  useEffect(() => {
    // if Redux state missing, exit
    if (!practiceState.source) {
      return history.push("/concepts");
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
        requestUrl = `/materials/${practiceState.id}?mastered=false`;
        break;
      case "part":
        requestUrl = `/parts/${practiceState.id}/facts?mastered=false`;
        break;
    }

    api.get<IFactsResponse>(requestUrl)
      .then(response => {
        const rawFacts = response.data.data.facts;

        setTotalFacts(rawFacts.length);
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

  // render
  function getNoFactsHeading() {
    if (facts?.length !== 0) return;
    return (
      <SHeadingSubtitle weight={500}>No facts found...</SHeadingSubtitle>
    );
  }

  function getPracticeScreen() {
    if (!facts) return;

    return (
      <>
        <STextContainer>
          <SMasteredIcon icon={faStar} />
          <SFactCount>{currentFactIndex + 1}/{totalFacts}</SFactCount>
          <SHeadingSubtitle>Question:</SHeadingSubtitle>
          <SText>{facts[currentFactIndex].question}</SText>

          { answerShowing ? (
            <>
              <SAnswerHeading>Answer:</SAnswerHeading>
              <SText>{facts[currentFactIndex].answer}</SText>
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
      <div style={{ textAlign: "center" }}>
        <SDoneHeading weight={500}>You are finished studying!</SDoneHeading>
        <SShowAnswerButton onClick={handleGoBack}>Exit</SShowAnswerButton>
      </div>
    )
  }

  if (!facts || currentFactIndex === -1) return <Loader />;
  return (
    <SContainer>
      { facts.length === 0 && getNoFactsHeading() }
      { facts.length > 0 && currentFactIndex < facts.length && getPracticeScreen() }
      { currentFactIndex === facts.length && getFinishedScreen() }
    </SContainer>
  );
}

const SContainer = styled(SPageContentCenter)`
  display: flex;
    flex-direction: column;
    justify-content: space-between;
  height: calc(100vh - ${theme.componentSizes.navbarHeight});
  padding: ${theme.spacing.base} ${theme.spacing.md};
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
`;

const STextarea = styled(STextareaBase)`
  padding: ${theme.spacing.sm};
  margin-top: ${theme.spacing.xs};
`;

const SFactCount = styled.h3`
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.xs};
  text-transform: uppercase;
`;

const SDoneHeading = styled(SHeadingSubtitle)`
  margin-bottom: ${theme.spacing.base};
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