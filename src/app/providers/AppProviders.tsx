import type {ReactNode} from 'react';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle, theme} from '../styles';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

interface AppProvidersProps {
    children: ReactNode;
}

export const AppProviders = ({children}: AppProvidersProps) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                {children}
            </ThemeProvider>
        </DndProvider>
    );
};