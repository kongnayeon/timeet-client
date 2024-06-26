import styled from '@emotion/styled';

import { KeyOfPalette, KeyOfTypo, theme } from '@shared/common/styles';

export const Flex = styled.div<{
  direction?: string;
  justify?: string;
  align?: string;
  margin?: string;
  padding?: string;
  gap?: number;
}>`
  display: flex;
  width: 100%;
  flex-direction: ${({ direction }) => (direction ? `${direction}` : 'row')};
  justify-content: ${({ justify }) => (justify ? `${justify}` : 'center')};
  align-items: ${({ align }) => (align ? `${align}` : 'center')};
  gap: ${({ gap }) => (gap ? `${gap}px` : '0px')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
`;

export const Space = styled.div<{
  height?: number;
  width?: number;
}>`
  height: ${({ height }) => (height ? `${height}px` : '')};
  width: ${({ width }) => (width ? `${width}px` : '')};
`;

export const Text = styled.p<{
  typo: KeyOfTypo;
  color: KeyOfPalette;
  height?: number;
}>`
  ${({ typo }) => theme.typo[typo]};
  color: ${({ color }) => theme.palette[color]};
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  margin: 0;
  padding: 0;
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
`;

export const ButtonWrapper = styled.div<{
  width: number;
}>`
  width: ${({ width }) => `${width}px`};
`;
