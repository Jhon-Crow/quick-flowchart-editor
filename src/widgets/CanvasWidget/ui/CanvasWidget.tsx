import styled from 'styled-components';
import {Toolbar} from './Toolbar/Toolbar';
import {Canvas} from './Canvas/Canvas';
import {useKeyboardShortcuts} from '../lib/useKeyboardShortcuts';
import {memo} from "react";

export const CanvasWidget = memo( () => {
    useKeyboardShortcuts();
    return (
        <WidgetContainer>
            <Toolbar />
            <Canvas />
        </WidgetContainer>
    );
} );

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;