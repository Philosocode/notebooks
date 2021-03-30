import React from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";

// logic
import { IUserSettings } from "user/redux/user.types";
import { updateUserSettings } from "user/redux/user.thunks";
import { useStep } from "shared/hooks/use-step.hook";

// components
import { ModalWrapper } from "./modal-wrapper.component";

// styles
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";
import { SButton, SButtonGreen } from "../../shared/styles/button.style";
import { theme } from "../../shared/styles/theme.style";

// images
import welcomeSvg from "shared/assets/undraw-welcome.svg";
import materialsImage from "shared/assets/materials.jpg";
import partsImage from "shared/assets/parts.jpg";
import sectionsImage from "shared/assets/sections.jpg";
import factsImage from "shared/assets/facts.jpg";
import conceptsImage from "shared/assets/concepts.jpg";
import hooksImage from "shared/assets/hooks.jpg";
import dragSvg from "shared/assets/undraw-drag.svg";
import practiceImage from "shared/assets/practice.jpg";
import doneSvg from "shared/assets/done.svg";

interface IProps {
  settings: IUserSettings;
}
export const WelcomeWizardModal: React.FC<IProps> = ({
  settings,
}) => {
  const dispatch = useDispatch();
  const minStep = 1;
  const maxStep = Object.keys(steps).length;

  const { step, increment, decrement } = useStep(minStep, maxStep);

  function handleClose() {
    dispatch(updateUserSettings({
      userId: "user",
      updates: {
        showWelcomeWizard: false,
      },
    }));
  }

  return (
    <ModalWrapper
      isShowing={settings.showWelcomeWizard}
      handleClose={handleClose}
      disableDefaultClose={true}
    >
      <div>
        <SStepHeading>Step {step}/{maxStep}</SStepHeading>
        {steps[step]}
      </div>
      <SButtons>
        <div>
          <SButton onClick={decrement} disabled={step === minStep}>Previous</SButton>
          <SButtonNext onClick={increment} disabled={step === maxStep}>Next</SButtonNext>
        </div>
        <SButtonClose hidden={step !== maxStep} onClick={handleClose}>Close</SButtonClose>
      </SButtons>
    </ModalWrapper>
  );
}

// styles
const fontCss = css`
  ${theme.media.tabLand} {
    font-size: ${theme.fontSizes.basePlus};
  }
`;

const SStepHeading = styled.h3`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: 3px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.md};
`;

const SBodyText = styled.p<{ weight?: string; }>`
  ${fontCss};
  
  margin-top: ${theme.spacing.sm};
  
  &:first-of-type {
    margin-top: ${theme.spacing.xs};
  }
`;

const SButtonNext = styled(SButtonGreen)`
  margin-left: ${theme.spacing.base};
`;

const SButtonClose = styled(SButtonGreen)<{ hidden: boolean; }>`
  display: ${props => props.hidden && "none"};
  margin-left: ${theme.spacing.base};
`;

const SImage = styled.img`
  border-radius: 5px;
  display: block;
  margin: 0 auto;
  margin-top: ${theme.spacing.base};
  max-width: 100%;
`;

const SImageShadow = styled(SImage)`
  box-shadow: ${theme.boxShadows.light};
`;

const SList = styled.ul`
  ${fontCss};
  
  list-style-type: disc;
  
  & > li {
    margin-left: ${theme.spacing.base};
  }
`;

// steps
const gettingStarted = (
  <>
    <SHeadingSubSubtitle>Getting Started</SHeadingSubSubtitle>
    <SBodyText>This quick guide will show you how to use this website.</SBodyText>
    <SBodyText>
      You can always view this guide again by clicking on your profile image in the top-right corner of the screen
      and selecting "Tutorial".
    </SBodyText>
    <SImage src={welcomeSvg} />
  </>
);

const materials = (
  <>
    <SHeadingSubSubtitle>Materials</SHeadingSubSubtitle>
    <SBodyText>Analogy: think of a material like a book or subject notebook</SBodyText>
    <SBodyText>
      Materials are used to organize and group notes.
      You can add tags to materials for further organization.
    </SBodyText>
    <SBodyText>Example Usages:</SBodyText>
    <SList>
      <li>Group notes for a school course</li>
      <li>Group notes for a single subject or topic</li>
      <li>Store notes for a video playlist</li>
    </SList>
    <SImageShadow src={materialsImage} />
  </>
);

const parts = (
  <>
    <SHeadingSubSubtitle>Material - Parts</SHeadingSubSubtitle>
    <SBodyText>
      A material is made up of multiple parts. Use parts to store a single "unit" of a material.
      For example, if your material is a course, a part could be 1 lecture.
    </SBodyText>
    <SBodyText>
      Analogy: chapter in a book
    </SBodyText>
    <SBodyText>Example Usages:</SBodyText>
    <SList>
      <li>Store notes for a lecture in a course</li>
      <li>Store notes for a chapter in a book</li>
      <li>Store notes for a video in a playlist</li>
    </SList>
    <SImageShadow src={partsImage} />
  </>
);

const sections = (
  <>
    <SHeadingSubSubtitle>Part - Sections</SHeadingSubSubtitle>
    <SBodyText>A section contains text boxes that you type your notes into. This is where you write your notes.</SBodyText>
    <SBodyText>A part can have many sections.</SBodyText>
    <SImageShadow src={sectionsImage} />
  </>
);

const facts = (
  <>
    <SHeadingSubSubtitle>Part - Facts</SHeadingSubSubtitle>
    <SBodyText>
      A fact is a flashcard. Create a fact for information you want to practice and remember.
    </SBodyText>
    <SBodyText>
      Clicking the checkmark will toggle the "mastered" status of a fact (green = mastered).
      If a fact is mastered, you won't see it in practice mode (more on that later).
    </SBodyText>
    <SBodyText>A part can have many facts.</SBodyText>
    <SImageShadow src={factsImage} />
  </>
);

const concepts = (
  <>
    <SHeadingSubSubtitle>Concepts</SHeadingSubSubtitle>
    <SBodyText>
      Concepts represent abstract ideas or concepts that you're struggling to understand.
      Create a concept when you want to better understand an idea, theory, or concept.
    </SBodyText>
    <SBodyText>Like materials, concepts can have tags.</SBodyText>
    <SImageShadow src={conceptsImage} />
  </>
);

const hooks = (
  <>
    <SHeadingSubSubtitle>Concept - Hooks</SHeadingSubSubtitle>
    <SBodyText>
      Hooks are prompts that help you deepen your understanding of a concept.
      They encourage you to think about the concept and relate to your existing knowledge.
    </SBodyText>
    <SBodyText>A concept can have many hooks.</SBodyText>
    <SImageShadow src={hooksImage} />
  </>
);

const dragAndDrop = (
  <>
    <SHeadingSubSubtitle>Drag & Drop</SHeadingSubSubtitle>
    <SBodyText>You can re-arrange the following things using drag-and-drop:</SBodyText>
    <SList>
      <li>Material: Parts, Sections, Facts</li>
      <li>Concept: Hooks</li>
    </SList>
    <SImage src={dragSvg} />
  </>
);

const practice = (
  <>
    <SHeadingSubSubtitle>Practice Mode</SHeadingSubSubtitle>
    <SBodyText>
      Click on "Practice" in the left sidebar to enter practice mode.
      This is where you can study your (non-mastered) facts.
    </SBodyText>
    <SBodyText>The facts loaded depends on your current page:</SBodyText>
    <SList>
      <li>Part Page: load facts for that part</li>
      <li>Material Page: load facts for all parts in that material</li>
      <li>Otherwise: load all facts for all materials / parts</li>
    </SList>
    <SImageShadow src={practiceImage} />
  </>
);

const done = (
  <>
    <SHeadingSubSubtitle>All Done!</SHeadingSubSubtitle>
    <SBodyText>
      You can always view this guide again by clicking on your profile image in the top-right corner of the screen
      and selecting "Tutorial".
    </SBodyText>
    <SImage src={doneSvg} style={{ maxHeight: "34rem" }} />
  </>
);

const steps: { [key: string]: React.ReactNode } = {
  1: gettingStarted,
  2: materials,
  3: parts,
  4: sections,
  5: facts,
  6: concepts,
  7: hooks,
  8: dragAndDrop,
  9: practice,
  10: done,
}
