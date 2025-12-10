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

    // Координаты центров узлов
    const x1 = sourceNode.x + sourceNode.width / 2;
    const y1 = sourceNode.y + sourceNode.height / 2;
    const x2 = targetNode.x + targetNode.width / 2;
    const y2 = targetNode.y + targetNode.height / 2;

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
  stroke: ${({theme, arrowType}) =>
          arrowType === 'directional' ? theme.colors.primary :
                  arrowType === 'bidirectional' ? theme.colors.secondary :
                          theme.colors.border};
  stroke-width: 2;
  marker-end: ${({arrowType}) =>
          arrowType === 'directional' || arrowType === 'bidirectional' ?
                  'url(#arrowhead)' : 'none'};
  cursor: pointer;
`;