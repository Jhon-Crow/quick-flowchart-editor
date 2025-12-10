export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    isActive?: boolean;
    fullWidth?: boolean;
}

export type ButtonVariant = Required<ButtonProps>['variant'];
export type ButtonSize = Required<ButtonProps>['size'];
