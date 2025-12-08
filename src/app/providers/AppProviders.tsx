import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../styles';

interface AppProvidersProps {
    children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};