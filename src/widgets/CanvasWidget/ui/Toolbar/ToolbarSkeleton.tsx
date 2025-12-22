import styled, {keyframes} from 'styled-components';
import {memo} from 'react';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const SimpleSkeletonToolbar = () => {
    return (
        <SkeletonContainer>
            <SkeletonLine width="70%" />
            <SkeletonLine width="20%" />
        </SkeletonContainer>
    );
};

const SkeletonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: ${({theme}) => theme.colors.surface};
  border-bottom: 1px solid ${({theme}) => theme.colors.border};
`;

const SkeletonLine = styled.div<{ width?: string }>`
  height: 36px;
  width: ${({ width }) => width || '100%'};
  background: ${({theme}) => theme.colors.background};
  border-radius: 6px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const SimpleToolbarSkeleton = memo(SimpleSkeletonToolbar);