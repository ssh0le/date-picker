import { styled } from 'styled-components';

import { flexCenter } from '@/styles/common';

export const GridCell = styled.div`
  ${flexCenter}
  padding: ${({theme}) => theme.padding.l}px;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
`;
