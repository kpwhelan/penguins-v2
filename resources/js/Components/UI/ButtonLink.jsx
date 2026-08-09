import { Link } from '@inertiajs/react';

const variants = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    dark: 'button-dark',
    light: 'button-light',
    outlineLight: 'button-outline-light',
};

export default function ButtonLink({
    href,
    variant = 'primary',
    className = '',
    external = false,
    children,
    ...props
}) {
    const classes = [
        variants[variant] ?? variants.primary,
        className,
    ].join(' ');

    if (external || href.startsWith('#')) {
        return (
            <a
                href={href}
                className={classes}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className={classes}
            {...props}
        >
            {children}
        </Link>
    );
}
