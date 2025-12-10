import styled from 'styled-components';
import {useCanvasStore} from '../../../Node/model/store/useCanvasStore';
import type {ArrowType, CanvasArrowType} from "../../../Node/model/types.ts";

interface ArrowProps {
    arrow: CanvasArrowType;
}

export const Arrow = ({arrow}: ArrowProps) => {
    const {nodes, selectArrow} = useCanvasStore();
    const sourceNode = nodes.find(n => n.id === arrow.sourceId);
    const targetNode = nodes.find(n => n.id === arrow.targetId);

    if (!sourceNode || !targetNode) return null;

    function countSourceX(){
        if (sourceNode!.x == targetNode!.x) return sourceNode!.x + sourceNode!.width / 2;
        if (sourceNode!.x < targetNode!.x) return sourceNode!.x + sourceNode!.width;
        if (sourceNode!.x > targetNode!.x) return sourceNode!.x;
    }

    function countTargetX(){
        if (targetNode!.x == sourceNode!.x) return targetNode!.x + targetNode!.width / 2;
        if (targetNode!.x < sourceNode!.x) return targetNode!.x + targetNode!.width;
        if (targetNode!.x > sourceNode!.x) return targetNode!.x;
    }


    function countSourceY(){
        if (sourceNode!.y == targetNode!.y) return sourceNode!.y + sourceNode!.height / 2;
        if (sourceNode!.y < targetNode!.y) return sourceNode!.y + sourceNode!.height / 1.5;
        if (sourceNode!.y > targetNode!.y) return sourceNode!.y + sourceNode!.height / 4;
    }

    function countTargetY(){
        if (targetNode!.y == sourceNode!.y) return targetNode!.y + targetNode!.height / 2;
        if (targetNode!.y < sourceNode!.y) return targetNode!.y + targetNode!.height / 1.5;
        if (targetNode!.y > sourceNode!.y) return targetNode!.y + targetNode!.height / 4;
    }
    // Координаты центров узлов
    const x1 = countSourceX();
    const y1 = countSourceY();
    const x2 = countTargetX();
    const y2 = countTargetY();

    return (
        <StyledLine
            x1={x1} y1={y1} x2={x2} y2={y2}
            arrowType={arrow.type}
            onClick={(e) => {
                e.stopPropagation();
                selectArrow(arrow.id);
            }}
        />
    );
};

const StyledLine = styled.line<{ arrowType: ArrowType }>`
  stroke: ${({theme }) => theme.colors.primary};
  stroke-width: 2;
  /* Для однонаправленных стрелок - наконечник только в конце */
  ${({ arrowType }) =>
          arrowType === 'directional' &&
          `
    marker-end: url(#arrowhead);
  `}

    /* Для двунаправленных стрелок - наконечники в начале и в конце */
  ${({ arrowType }) =>
          arrowType === 'bidirectional' &&
          `
    marker-end: url(#arrowhead);
    marker-start: url(#arrowhead);
  `}

  cursor: pointer;
`;