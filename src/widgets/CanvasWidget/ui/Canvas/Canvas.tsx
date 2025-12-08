import styled from 'styled-components';
import { Node } from '@/entities/Node';


const StyledCanvas = styled.div`
  flex: 1;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  min-height: 600px;
`;

export const Canvas = () => {
    return (
        <StyledCanvas id="canvas">
            {/* Здесь будут рендериться Node компоненты */}
            <Node type="rectangle" x={100} y={100} text="Прямоугольник" />
            <Node type="circle" x={200} y={200} text="Круг" />
        </StyledCanvas>
    );
};
