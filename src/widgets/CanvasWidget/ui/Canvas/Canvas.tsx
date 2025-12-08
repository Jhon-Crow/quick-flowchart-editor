import styled from 'styled-components';
import {CanvasNode} from "../../../../entities/Node/ui/Node/CanvasNode.tsx";
import type {Theme} from "../../../../app/styles";

const StyledCanvas = styled.div`
  flex: 1;
  position: relative;
  background: ${({theme}: {theme: Theme}) => theme.colors.background};
  min-height: 600px;
`;

export const Canvas = () => {
    return (
        <StyledCanvas id="canvas">
            {/* Здесь будут рендериться Node компоненты */}
            <CanvasNode type="rectangle" x={100} y={100} text="Прямоугольник"/>
            <CanvasNode type="circle" x={200} y={200} text="Круг"/>
        </StyledCanvas>
    );
};
