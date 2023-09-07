import styled from 'styled-components';

interface GridProps {
    cols: number;
    colWidth: string;
}

export const Grid = styled.div<GridProps>`
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: repeat(${({ cols, colWidth }) => `${cols ?? 7}, ${colWidth}`});
`;
