import styled, {css, keyframes} from 'styled-components';
import type {ButtonSize, ButtonVariant} from './types.ts';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const variantStyles = {
    primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary}dd;
      border-color: ${({ theme }) => theme.colors.primary}dd;
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary}bb;
    }
  `,

    secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.background};
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,

    ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.background};
      border-color: ${({ theme }) => theme.colors.border};
    }
  `,

    danger: css`
    background: ${({ theme }) => theme.colors.error};
    color: white;
    border: 1px solid ${({ theme }) => theme.colors.error};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.error}dd;
      border-color: ${({ theme }) => theme.colors.error}dd;
    }
  `,
};

const sizeStyles = {
    sm: css`
    padding: 6px 12px;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    height: 32px;
    min-width: 64px;
  `,

    md: css`
    padding: 8px 16px;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    height: 40px;
    min-width: 80px;
  `,

    lg: css`
    padding: 12px 24px;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    height: 48px;
    min-width: 96px;
  `,
};

interface StyledButtonProps {
    variant: ButtonVariant;
    size: ButtonSize;
    isLoading: boolean;
    isActive: boolean;
    fullWidth: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  gap: 8px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* Variant styles */
  ${({ variant }) => variantStyles[variant]}

  /* Size styles */
  ${({ size }) => sizeStyles[size]}

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Focus state */
  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}40;
  }

  /* Loading state */
  ${({ isLoading }) =>
    isLoading &&
    css`
      cursor: wait;
      opacity: 0.8;
    `}
  
  ${({ isActive }) =>
          isActive &&
          css`
            background-color: coral;
          `}
`;

interface LoaderProps {
    size: ButtonSize;
}

export const Loader = styled.div<LoaderProps>`
  width: ${({ size }) => (size === 'sm' ? '12px' : size === 'md' ? '20px' : '40px')};
  height: ${({ size }) => (size === 'sm' ? '12px' : size === 'md' ? '20px' : '40px')};
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

interface ButtonContentProps {
    isLoading: boolean;
}

export const ButtonContent = styled.span<ButtonContentProps>`
  opacity: ${({ isLoading }) => (isLoading ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;