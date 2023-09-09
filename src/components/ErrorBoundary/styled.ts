import styled from 'styled-components';

export const ErrorBoundaryContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: fit-content;
    gap: 10px;
`

export const ErrorMessageContainer = styled.p`
    font-weight: bold;
    margin: 0;
`

export const ReloadButton = styled.button`
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
`