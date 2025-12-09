import React from 'react';
import type { ButtonProps } from './types.ts';
import { StyledButton, Loader, ButtonContent } from './styles.ts';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            fullWidth = false,
            disabled,
            className,
            type = 'button',
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || isLoading;

        return (
            <StyledButton
                ref={ref}
                type={type}
                variant={variant}
                size={size}
                disabled={isDisabled}
                isLoading={isLoading}
                fullWidth={fullWidth}
                className={className}
                aria-busy={isLoading}
                {...props}
            >
                {isLoading && <Loader size={size} />}
                <ButtonContent isLoading={isLoading}>{children}</ButtonContent>
            </StyledButton>
        );
    }
);

Button.displayName = 'Button';