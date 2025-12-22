export const theme = {
    colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        background: '#f9fafb',
        surface: '#ffffff',
        border: '#e5e7eb',
        text: {
            primary: '#111827',
            secondary: '#6b7280',
        },
        error: '#ef4444',
        warning: '#f59e0b',
        success: '#10b981',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: {
            xs: '12px',
            sm: '14px',
            md: '16px',
            lg: '18px',
            xl: '24px',
        },
    },
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px',
    },
} as const;

export type Theme = typeof theme;