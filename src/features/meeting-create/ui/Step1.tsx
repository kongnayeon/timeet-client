import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';

import { Flex, Space, Input, SvgIcon } from '@shared/common/ui';
import { theme } from '@shared/common/styles';

import type { Form } from '@features/meeting-create/types';
import { thumbnailList } from '@features/meeting-create/assets';

interface Step1Props {
  register: UseFormRegister<Form>;
  watch: UseFormWatch<Form>;
  errors?: FieldErrors;
  setValue: UseFormSetValue<Form>;
}

export const Step1 = ({ register, watch, errors, setValue }: Step1Props) => {
  return (
    <Flex direction="column" align="flex-start">
      <div
        css={css`
          width: 100%;
        `}>
        <StyledLabel>
          회의 이름을 알려주세요
          <SvgIcon id="star_orange" size={18} />
        </StyledLabel>
        <Input
          {...register('step1.meetingRoomName', {
            required: '회의 이름을 입력해주세요',
            maxLength: {
              message: '최대 15자까지 입력가능해요',
              value: 15
            }
          })}
          value={watch('step1.meetingRoomName')}
          type="default"
          placeholder="회의 이름"
          maxLength={15}
          isError={errors?.meetingRoomName ? true : false}
          errorText={errors?.meetingRoomName?.message as string}
        />

        <Space height={4} />

        <StyledLabel>회의 공지가 있다면 적어주세요</StyledLabel>
        <Input
          {...register('step1.meetingRoomNotice', {
            maxLength: {
              message: '최대 15자까지 입력가능해요',
              value: 15
            }
          })}
          multiline={true}
          value={watch('step1.meetingRoomNotice')}
          type="default"
          placeholder="선택 사항입니다"
          maxLength={30}
          isError={errors?.meetingRoomNotice ? true : false}
          errorText={errors?.meetingRoomNotice?.message as string}
          height={92}
        />

        <Space height={4} />

        <StyledLabel>
          썸네일을 골라주세요
          <SvgIcon id="star_orange" size={18} />
        </StyledLabel>

        <StyledThumbnailList>
          {thumbnailList.map((thumbnail) => (
            <StyledThumbnail
              key={thumbnail.id}
              onClick={() => {
                setValue('step1.meetingThumbnail', String(thumbnail.id + 1));
              }}
              isSelected={
                thumbnail.id + 1 === Number(watch('step1.meetingThumbnail'))
              }>
              {thumbnail.icon()}
            </StyledThumbnail>
          ))}
        </StyledThumbnailList>
      </div>
    </Flex>
  );
};

const StyledLabel = styled.label`
  ${(props) => props.theme.typo.T5}
  color: ${(props) => props.theme.palette.dark_gray2};
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 1rem;
`;

const StyledThumbnailList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.2rem;
`;

const StyledThumbnail = styled.button<{ isSelected: boolean }>`
  height: 100%;
  aspect-ratio: 1 / 1;
  border: ${({ isSelected }) =>
    isSelected
      ? `2px solid ${theme.palette.main_blue}`
      : '2px solid transparent'};
  border-radius: 14px;
`;
