import styled from 'styled-components';
import {useCanvasStore} from "@/entities/Node";
import {Node} from "@/entities/Node";

export const Canvas = () => {
    const { nodes, clearSelection } = useCanvasStore();

    const handleCanvasClick = () => {
        clearSelection();
    };

    return (
        <StyledCanvas onClick={handleCanvasClick}>
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
