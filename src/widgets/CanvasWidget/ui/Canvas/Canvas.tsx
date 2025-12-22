import styled from 'styled-components';
import {Node, useCanvasStore} from "@/entities/Node";
import {Arrow} from "@/entities/Arrow/ui/Arrow/Arrow.tsx";
import {useShallow} from "zustand/react/shallow";
import {memo} from "react";

const CanvasComponent = () => {
    const { nodes, arrows, clearSelection } = useCanvasStore(
        useShallow((state) => ({
            nodes: state.nodes,
            arrows: state.arrows,
            selectedNodeId: state.selectedNodeId,
            selectedArrowId: state.selectedArrowId,
            clearSelection: state.clearSelection,
        }))
    );
    const handleCanvasClick = () => {
        clearSelection();
    };

    return (
        <StyledCanvas onClick={handleCanvasClick}>
            <svg style={{zIndex: 100, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto-start-reverse">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6"/>
                    </marker>
                </defs>
                {arrows.map((arrow) => (
                    <Arrow key={arrow.id} arrow={arrow}/>
                ))}
            </svg>
            {nodes.map((node) => (
                <Node key={node.id} node={node}/>
            ))}
        </StyledCanvas>
    );
};

const StyledCanvas = styled.div`
  flex: 1;
  position: relative;
  background: ${({theme}) => theme.colors.background};
  min-height: 600px;
  cursor: default;
  overflow: auto;
`;

export const Canvas = memo(CanvasComponent);