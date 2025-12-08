import styled from 'styled-components';
import type {NodeProps} from "../../model/types.ts";


const StyledNode = styled.div<{ type: 'rectangle' | 'circle' }>`
  position: absolute;
  width: 100px;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ type }) => (type === 'circle' ? '50%' : '4px')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: move;
  user-select: none;
`;

export const Node = ({ type, x, y, text }: NodeProps) => {
    return (
        <StyledNode type={type} style={{ left: x, top: y }}>
            {text}
        </StyledNode>
    );
};
