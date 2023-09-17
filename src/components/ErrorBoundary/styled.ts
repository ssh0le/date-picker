import styled from 'styled-components';

import { flexCenter } from '@/styles/common';

export const ErrorBoundaryContainer = styled.section`
  ${flexCenter}
  flex-direction: column;
  width: fit-content;
  gap: ${({ theme }) => theme.gap.l}px;
`;

export const ErrorMessageContainer = styled.p`
  font-weight: bold;
`;

export const ReloadButton = styled.button`
  padding: ${({ theme }) => theme.padding.m}px;
  border: 1px solid black;
  border-radius: 5px;
`;
