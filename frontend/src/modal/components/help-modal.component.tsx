import React from "react";
import styled from "styled-components";

import { ModalWrapper } from "./modal-wrapper.component";

import { theme } from "../../shared/styles/theme.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { SButtonGreen } from "../../shared/styles/button.style";

const rubberDuckingUrl = "https://medium.com/@katiebrouwers/why-rubber-ducking-is-one-of-your-greatest-resources-as-a-developer-99ac0ee5b70a";

interface IProps {
  handleClose: () => void;
  isShowing: boolean;
}

export const HelpModal: React.FC<IProps> = ({ handleClose, isShowing }) => {
  return (
    <ModalWrapper
      handleClose={handleClose}
      isShowing={isShowing}
    >
      <SHeadingSubtitle>Stuck?</SHeadingSubtitle>
      <SList>
        <li>Stop thinking about the material. Take a break. Get some food / water, go for a walk</li>
        <li>Switch to a completely different type of problem</li>
        <li><SLink href={rubberDuckingUrl}>Rubber Duck Debugging:</SLink> find an inanimate object or person. Explain
          the problem is detail. What's the goal? What have you tried doing? What's not working?
        </li>
        <li>Productive Meditation: pick a specific problem you're working on, or a concept you're struggling to understand.
          Go for a long walk / bike ride / exercise and think of how to solve the problem</li>
        <li>Resource Exploration: watch various videos on the topic.
          Check sites like Google, Reddit, and StackExchange.
          Do a search with "ELI5" included (explain like I'm five)</li>
      </SList>
    </ModalWrapper>
  );
};

const SButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.base};
`;

const SLink = styled.a`
  color: ${theme.colors.green[400]};
  text-decoration: underline;
`;

const SList = styled.ul`
  font-size: ${theme.fontSizes.basePlus};
  list-style-type: disc;
  margin-top: ${theme.spacing.xs};
  padding-left: ${theme.spacing.base};
`;