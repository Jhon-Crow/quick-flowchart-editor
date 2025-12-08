import styled from 'styled-components';
import {useCanvasStore} from "../../../../entities/Node/model/store/useCanvasStore.ts";
import {CanvasNode} from "../../../../entities/Node/ui/Node/CanvasNode.tsx";

export const Canvas = () => {
    const { nodes, clearSelection } = useCanvasStore();

    const handleCanvasClick = () => {
        clearSelection();
    };

    return (
        <StyledCanvas onClick={handleCanvasClick}>
            {nodes.map((node) => (
                <CanvasNode key={node.id} node={node} />
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
