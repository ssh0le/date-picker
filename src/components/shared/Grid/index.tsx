import styled from 'styled-components';

interface GridProps {
  $cols: number;
  $colWidth: string;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(
    ${({ $cols, $colWidth }) => `${$cols ?? 7}, ${$colWidth}`}
  );
`;
