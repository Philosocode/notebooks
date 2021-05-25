import React from "react";
import styled from "styled-components";

import { useRandom } from "../../shared/hooks/use-random.hook";

import { ModalWrapper } from "./modal-wrapper.component";
import { CircleIcon } from "../../shared/components/button/circle-icon.component";

import { theme } from "../../shared/styles/theme.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";

interface IProps {
  items: any[];
  isShowing: boolean;
  title: string;
  handleClose: () => void;
}
export const RandomModal: React.FC<IProps> = ({
  items,
  isShowing,
  title,
  handleClose,
}) => {
  const [item, getRandomItem] = useRandom(items, items[0]);

  function handleClick() {
    getRandomItem();
  }

  return (
    <ModalWrapper
      handleClose={handleClose}
      isShowing={isShowing}
    >
      <SHeadingSubtitle>{title}</SHeadingSubtitle>
      <SIconContainer>
        <CircleIcon handleClick={handleClick} icon="redo" />
      </SIconContainer>
      <STextContainer>{item}</STextContainer>
    </ModalWrapper>
  );
};

const SIconContainer = styled.div`
  display: inline-block;
  transform: translateX(-0.5em);
`;

const STextContainer = styled.div`
  background: ${theme.colors.gray[100]};
  padding: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.basePlus};
  }
  
  & > ol,
  & > ul {
    list-style-type: disc;
    padding-left: ${theme.spacing.base};
  }
`;