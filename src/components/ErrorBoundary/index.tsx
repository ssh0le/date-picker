import React, { Component } from 'react';

import GlobalStyle from '@/styles/global';

import { ErrorBoundaryProps } from './interfaces';
import {
  ErrorBoundaryContainer,
  ErrorMessageContainer,
  ReloadButton,
} from './styled';

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: Readonly<{ hasError: boolean }> = { hasError: false };

  componentDidCatch(): void {
    this.setState({ hasError: true });
  }

  handleReloadClick = () => this.setState({ hasError: false });

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    return (
      <>
        {!hasError && <>{children}</>}
        {hasError && (
          <ErrorBoundaryContainer>
            <GlobalStyle />
            <ErrorMessageContainer>Something went wrong</ErrorMessageContainer>
            <ReloadButton onClick={this.handleReloadClick}>Reload</ReloadButton>
          </ErrorBoundaryContainer>
        )}
      </>
    );
  }
}
