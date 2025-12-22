import styled from 'styled-components';
import {Canvas} from './Canvas/Canvas';
import {useKeyboardShortcuts} from '../lib/useKeyboardShortcuts';
import {lazy, memo, Suspense} from "react";
import {SimpleToolbarSkeleton} from "./Toolbar/ToolbarSkeleton.tsx";
import {Loader} from "@/shared/Button";

const Toolbar = lazy(() => import('./Toolbar/Toolbar'));
const DiagramsWidget = lazy(() => import('./DiagramsWidget/DiagramsWidget'));

 const CanvasWidget = memo(() => {
    useKeyboardShortcuts();
    return (
        <WidgetContainer>
            <Suspense fallback={<SimpleToolbarSkeleton/>}>
                <Toolbar/>
            </Suspense>

            <Suspense fallback={
                <Loader style={{
                    borderTopColor: '#25cb13',
                    position: 'absolute',
                    zIndex: '9990',
                    bottom: '4rem',
                    right: '6rem'
                }} size={"lg"}/>
            }>
                <DiagramsWidget/>
            </Suspense>
            <Canvas/>
        </WidgetContainer>
    )
});

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: ${({theme}) => theme.shadows.md};
`;

export default CanvasWidget;