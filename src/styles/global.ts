import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Open Sans', sans-serif;
        margin: 0;
        padding: 0;
    }

    button {
        outline: none;
    }

    ul {
        list-style-type: none;
    }
`;

export default GlobalStyle;
