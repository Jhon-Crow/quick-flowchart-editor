import styled from 'styled-components';
import {Node, useCanvasStore} from "@/entities/Node";
import {Arrow} from "@/entities/Arrow/ui/Arrow/Arrow.tsx";

export const Canvas = () => {
    const { nodes, arrows, clearSelection } = useCanvasStore();

    const handleCanvasClick = () => {
        clearSelection();
    };

    // todo разобраться как рисуется svg строка
    return (
        <StyledCanvas onClick={handleCanvasClick}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                    </marker>
                </defs>
                {arrows.map((arrow) => (
                    <Arrow key={arrow.id} arrow={arrow} />
                ))}
            </svg>
            {nodes.map((node) => (
                <Node key={node.id} node={node} />
            ))}
        </StyledCanvas>
    );
};

const StyledCanvas = styled.div`
  flex: 1;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  min-height: 600px;
  cursor: default;
  overflow: hidden;
`;
