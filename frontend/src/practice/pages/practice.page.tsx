import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import shuffle from "lodash/shuffle";
import styled from "styled-components";

import { IFact } from "../../fact/redux/fact.types";
import { api } from "../../services/api.service";
import { selectPracticeState } from "../redux/practice.selectors";
import { setPracticeState } from "../redux/practice.slice";

import { Loader } from "loading/components/loader.component";

import { theme } from "../../shared/styles/theme.style";
import { SPageContentCenter } from "../../shared/styles/layout.style";
import { SHeadingSubtitle } from "../../shared/styles/typography.style";
import { SButtonGreen, SButtonRed, SButton } from "shared/styles/button.style";
import { CircleIcon } from "../../shared/components/button/circle-icon.component";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useToggle } from "../../shared/hooks/use-toggle.hook";

export const PracticePage: React.FC = () => {
  const practiceState = useSelector(selectPracticeState);
  const history = useHistory();
  const dispatch = useDispatch();

  const [facts, setFacts] = useState<IFact[]>();
  const [currentFactIndex, setCurrentFactIndex] = useState(-1);
  const [totalFacts, setTotalFacts] = useState(0);
  const [answerShowing, toggleAnswerShowing] = useToggle(false);

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
    toggleAnswerShowing();
  }

  function handleGoBack() {
    history.goBack();
  }

  function handlePrevious() {
    if (currentFactIndex === 0) return;
    toggleAnswerShowing();

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

          <SAnswerHeading>Answer:</SAnswerHeading>
          <SText>{facts[currentFactIndex].answer}</SText>
        </STextContainer>

        <SButtons>
          {
            answerShowing ? (
              <>
                <SButton disabled={currentFactIndex === 0} onClick={handlePrevious}>Previous</SButton>
                <SButtonGreen onClick={handleSuccess}>Success</SButtonGreen>
                <SButtonRed>Fail</SButtonRed>
              </>
            ) : (
              <SShowAnswerButton onClick={toggleAnswerShowing}>Show Answer</SShowAnswerButton>
            )
          }
        </SButtons>
      </>
    );
  }

  function getFinishedScreen() {
    return (
      <div>
        <SDoneHeading weight={500}>You are finished studying!</SDoneHeading>
        <SButtonGreen onClick={handleGoBack}>Exit</SButtonGreen>
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
  font-size: ${theme.fontSizes.md};
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.lg};
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