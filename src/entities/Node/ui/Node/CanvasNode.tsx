import styled from 'styled-components';
import type { CanvasNodeType } from '../../model/types';
import { useCanvasStore } from '../../model/store/useCanvasStore';

interface NodeProps {
    node: CanvasNodeType;
}

export const CanvasNode = ({ node }: NodeProps) => {
    const { selectNode } = useCanvasStore();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        selectNode(node.id);
    };

    return (
        <StyledNode
            type={node.type}
            isSelected={node.isSelected}
            style={{
                left: node.x,
                top: node.y,
                width: node.width,
                height: node.height,
            }}
            onClick={handleClick}
            data-node-id={node.id}
        >
            {node.text}
        </StyledNode>
    );
};

const StyledNode = styled.div<{
    type: 'rectangle' | 'circle';
    isSelected: boolean;
}>`
  position: absolute;
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.secondary};
  border-radius: ${({ type }) => (type === 'circle' ? '50%' : '8px')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: move;
  user-select: none;
  padding: 8px;
  text-align: center;
  transition: background-color 0.2s;
  border: 2px solid ${({ theme, isSelected }) =>
    isSelected ? theme.colors.warning : 'transparent'};
  
  &:hover {
    opacity: 0.9;
  }
`;
