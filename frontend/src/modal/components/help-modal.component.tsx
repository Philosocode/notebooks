import React, { useEffect } from "react";
import styled from "styled-components";

import { useRandom } from "../../shared/hooks/use-random.hook";

import { ModalWrapper } from "./modal-wrapper.component";

import { theme } from "../../shared/styles/theme.style";
import { SAnchorTag, SHeadingSubtitle } from "shared/styles/typography.style";
import { IconCircle } from "../../shared/components/button/circle-icon.component";

const duckUrl = `https://en.wikipedia.org/wiki/Rubber_duck_debugging`;
const meditationUrl = `https://www.candoideas.com/blog/why-productive-meditation-should-be-on-your-to-do-list`;

const items = [
  <ul>
    <li>Relax. Take a break</li>
    <li>Stop thinking about the material. Your subconscious mind will process
      the material in the background</li>
    <li>Get some food / water</li>
    <li>Go for a walk</li>
  </ul>,

  <p>Switch to a completely different type of problem. Come back to this problem later.</p>,

  <>
    <SAnchorTag href={duckUrl}>Rubber Duck Debugging:</SAnchorTag>
    <ol>
      <li>Find an inanimate object or person</li>
      <li>Explain the problem in detail</li>
      <li>What's the goal?</li>
      <li>What have you tried doing?</li>
      <li>What's not working?</li>
    </ol>
  </>,
  <>
    <SAnchorTag href={meditationUrl}>Productive Meditation:</SAnchorTag>
    <ol>
      <li>Pick a problem you're working on or a concept you're struggling with</li>
      <li>Go for a long walk, bike ride, exercise, drive, or other (physical) activity</li>
      <li>While doing so, focus on the problem and think of how to solve it</li>
    </ol>
  </>,
  <>
    <p>Resource Exploration:</p>
    <ul>
      <li>Watch various videos from different people</li>
      <li>Check sites like Google, Reddit, StackExchange, etc</li>
      <li>Do a search with "ELI5" included (explain like I'm 5)</li>
    </ul>
  </>,
  <>
    <p>Sleep On It:</p>
    <ol>
      <li>Think of / work on the problem before you go to sleep</li>
      <li>Get a good night's sleep</li>
      <li>Review the problem when you wake up</li>
    </ol>
  </>
];

interface IProps {
  handleClose: () => void;
  isShowing: boolean;
}
export const HelpModal: React.FC<IProps> = ({ handleClose, isShowing }) => {
  const [item, getRandomItem] = useRandom(items, items[0]);

  function handleClick() {
    getRandomItem();
  }

  return (
    <ModalWrapper
      handleClose={handleClose}
      isShowing={isShowing}
    >
      <SHeadingSubtitle>
        Get Un-stuck
      </SHeadingSubtitle>
      <SIconContainer>
        <IconCircle handleClick={handleClick} icon="redo" />
      </SIconContainer>
      <STextContainer>
        {item}
      </STextContainer>
    </ModalWrapper>
  );
};

const SIconContainer = styled.div`
  display: inline-block;
  transform: translateX(-0.5em);
`;

const STextContainer = styled.div`
  background: ${theme.colors.gray[100]};
  font-size: ${theme.fontSizes.basePlus};
  padding: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  
  & > ol,
  & > ul {
    list-style-type: disc;
    padding-left: ${theme.spacing.base};
  }
`;