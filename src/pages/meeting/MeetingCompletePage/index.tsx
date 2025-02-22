import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { Header, SvgIcon, Space } from '@shared/common/ui';
import { media } from '@shared/common/styles';

import { Step1, Step2 } from '@features/meeting-complete/ui';
import { FolderIcon } from '@features/meeting-complete/assets';

const MeetingCompletePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <Header>
        <Header.Left>
          <SvgIcon id="arrow_left" onClick={() => navigate(-1)} />
        </Header.Left>
        <Header.Right>
          <SvgIcon id="x" />
        </Header.Right>
      </Header>

      <Space height={38} />

      <StyledContent>
        <StyledClipIcon>
          <SvgIcon id="clip" size={50} />
        </StyledClipIcon>

        <StyledStepList>
          {[1, 2].map((step) => (
            <StyledStep key={step} isCurrentStep={currentStep === step}>
              {step}
            </StyledStep>
          ))}
        </StyledStepList>

        <Space height={22} />

        {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} />}
        {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} />}
      </StyledContent>

      <Space height={25.5} />

      <StyledIcon>
        <FolderIcon />
      </StyledIcon>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 37.5rem;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.palette.light_white};
  margin: 0px -20px;
  padding: 0px 20px;

  ${media.mobile} {
    width: 100vw;
  }
`;

const StyledContent = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 4rem 2.2rem 3rem 2.2rem;
  border-radius: 2rem;
`;

const StyledClipIcon = styled.div`
  position: absolute;
  top: -2.5rem;
  left: 0.5rem;
`;

const StyledStepList = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const StyledStep = styled.div<{ isCurrentStep: boolean }>`
  ${({ theme }) => theme.typo.T7};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  background-color: ${({ isCurrentStep, theme }) =>
    isCurrentStep ? theme.palette.main_blue : theme.palette.light_gray2};
  color: ${({ isCurrentStep, theme }) =>
    isCurrentStep ? theme.palette.white : theme.palette.light_gray4};
  border-radius: 100%;
`;

const StyledIcon = styled.div`
  transform: translateY(0.15rem);
`;

export default MeetingCompletePage;
