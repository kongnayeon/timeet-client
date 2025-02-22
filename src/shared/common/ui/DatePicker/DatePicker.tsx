import { useState } from 'react';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
import 'swiper/css';

import { SvgIcon } from '@shared/common/ui';
import type { Date } from '@shared/common/types';
import { getToday } from '@shared/common/utils';

interface DatePickerProps {
  date: Date;
  setDate: ({ year, month, date }: Date) => void;
  onClose: () => void;
}

export const DatePicker = ({ date, setDate, onClose }: DatePickerProps) => {
  const dayList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  /**
   * 숫자 n을 입력받아 1부터 n까지의 array를 생성해 주는 함수
   * @param {number} n 입력 숫자
   * @returns {number[]} [1, 2, ... , n]
   */
  const createArray1ToN = (n: number) =>
    [...Array(n)].map((_, index) => index + 1);

  const [swiperRef, setSwiperRef] = useState<SwiperRef | null>(null);
  const [slideList, setSlideList] = useState([
    {
      id: 0,
      // 선택된 달의 시작 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
      firstDayOfMonth: new Date(date.year, date.month - 1, 1).getDay(),
      // 선택된 달의 전체 날짜 갯수
      totalDateOfMonth: new Date(date.year, date.month, 0).getDate()
    },
    {
      id: 1,
      firstDayOfMonth: new Date(date.year, date.month, 1).getDay(),
      totalDateOfMonth: new Date(date.year, date.month + 1, 0).getDate()
    }
  ]);

  /**
   * Left Arrow 아이콘 클릭 시 이전 Slide로의 이동 함수
   */
  const onPrevSlide = () => {
    swiperRef?.slidePrev();
  };

  /**
   * Right Arrow 아이콘 클릭 시 다음 Slide로의 이동 함수
   */
  const onNextSlide = () => {
    swiperRef?.slideNext();
  };

  /**
   * 마지막 Slide 도착 시 다음 Slide 추가 함수
   */
  const appendSlide = () => {
    setSlideList((prev) => {
      const lastSlide = prev[prev.length - 1];
      return [
        ...prev,
        {
          id: lastSlide.id + 1,
          firstDayOfMonth: new Date(date.year, date.month + 1, 1).getDay(),
          totalDateOfMonth: new Date(date.year, date.month + 2, 0).getDate()
        }
      ];
    });
  };

  /**
   * 달력의 날짜 클릭 시 해당 날짜로 포커스 시키는 함수
   * @param {number} updatedDate 클릭한 날짜
   */
  const selectDate = (updatedDate: number) => {
    setDate({ year: date.year, month: date.month, date: updatedDate });
    onClose();
  };

  /**
   * 이전 달로 이동 시 선택된 날짜 변경 함수
   */
  const prevMonth = () => {
    setDate({
      year: date.month === 1 ? date.year - 1 : date.year,
      month: date.month === 1 ? 12 : date.month - 1,
      date: 1
    });
  };

  /**
   * 다음 달로 이동 시 선택된 날짜 변경 함수
   */
  const nextMonth = () => {
    setDate({
      year: date.month === 12 ? date.year + 1 : date.year,
      month: date.month === 12 ? 1 : date.month + 1,
      date: 1
    });
  };

  return (
    <StyledDatePicker>
      {/* 달력 헤더 영역(달, 년도, 화살표 아이콘) Start */}
      <StyledHeader>
        <StyledMonthYear>
          {date.month}월 {date.year}
        </StyledMonthYear>

        <StyledArrow>
          <SvgIcon id="date_picker_arrow_left" onClick={onPrevSlide} />
          <SvgIcon id="date_picker_arrow_right" onClick={onNextSlide} />
        </StyledArrow>
      </StyledHeader>
      {/* 달력 헤더 영역(달, 년도, 화살표 아이콘) End */}

      {/* 요일 영역(SUN, MON, ... , SAT) Start */}
      <StyledDayList>
        {dayList.map((day: string) => (
          <StyledDay key={day}>{day}</StyledDay>
        ))}
      </StyledDayList>
      {/* 요일 영역(SUN, MON, ... , SAT) End */}

      <Swiper
        onSwiper={setSwiperRef}
        onSlidePrevTransitionEnd={prevMonth}
        onSlideNextTransitionEnd={nextMonth}
        onReachEnd={appendSlide}>
        {slideList.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* 날짜 영역 Start */}
            <StyledDateNumList>
              {/* 빈 칸 */}
              {createArray1ToN(slide.firstDayOfMonth).map((index) => (
                <StyledDateNum
                  key={index}
                  isSelected={false}
                  isToday={false}
                  isPreviousDate={false}
                />
              ))}

              {/* 1 ~ 31 */}
              {createArray1ToN(slide.totalDateOfMonth).map((dateOfMonth) => (
                <StyledDateNum
                  key={dateOfMonth}
                  onClick={() => selectDate(dateOfMonth)}
                  isSelected={dateOfMonth === date.date}
                  isToday={
                    getToday().year === date.year &&
                    getToday().month === date.month &&
                    getToday().date === dateOfMonth
                  }
                  isPreviousDate={
                    getToday().year >= date.year &&
                    getToday().month >= date.month &&
                    getToday().date > dateOfMonth
                  }>
                  {dateOfMonth}
                </StyledDateNum>
              ))}
            </StyledDateNumList>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 날짜 영역 End */}
    </StyledDatePicker>
  );
};

const StyledDatePicker = styled.div`
  width: 100%;
  color: ${(props) => props.theme.palette.dark_gray2};
  background-color: ${({ theme }) => theme.palette.light_white};
  border-radius: 0.8rem;
  padding: 2rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const StyledMonthYear = styled.div`
  ${({ theme }) => theme.typo.B1}
`;

const StyledArrow = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledDayList = styled.div`
  ${({ theme }) => theme.typo.B7}
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 0.4rem;
`;

const StyledDay = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledDateNumList = styled.div`
  ${({ theme }) => theme.typo.B1}
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.4rem;
`;

const StyledDateNum = styled.div<{
  isSelected: boolean;
  isToday: boolean;
  isPreviousDate: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  background-color: ${({ isSelected, isToday, theme }) =>
    isSelected ? theme.palette.main_blue : isToday && theme.palette.skyblue};
  border-radius: 1.2rem;
  color: ${({ isSelected, isToday, isPreviousDate, theme }) =>
    isPreviousDate
      ? theme.palette.light_gray4
      : isSelected
        ? theme.palette.white
        : isToday && theme.palette.main_blue};
  cursor: pointer;
`;
