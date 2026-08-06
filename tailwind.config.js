import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx,ts,tsx}',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },

            colors: {
                penguins: {
                    50: '#eefaff',
                    100: '#d9f5ff',
                    200: '#bcecff',
                    300: '#8ee0ff',
                    400: '#57cff9',
                    500: '#2ac2f2',
                    600: '#0ca5d8',
                    700: '#0c83ae',
                    800: '#106c8e',
                    900: '#125a76',
                    950: '#07394f',
                },

                navy: {
                    50: '#f1f7fb',
                    100: '#dfeef5',
                    200: '#c5dfea',
                    300: '#9dc8db',
                    400: '#6eaac5',
                    500: '#4b8dab',
                    600: '#39718e',
                    700: '#315b73',
                    800: '#2d4e60',
                    900: '#294252',
                    950: '#071b2d',
                },

                ice: '#eaf8fd',
                mist: '#f5fafc',
                ink: '#102433',
                slate: '#526879',

                /*
                 * Legacy alias.
                 *
                 * Existing pages currently use `penguinsBlue`.
                 * Keeping this prevents those pages from breaking while
                 * we gradually migrate them to the new palette.
                 */
                penguinsBlue: '#2ac2f2',
            },

            backgroundImage: {
                membershipPageBackground:
                    "url('/assets/membership-background.jpg')",
                aboutUsPageBackground:
                    "url('/assets/about-us.jpg')",
                swimBackground:
                    "url('/assets/swim-background.jpg')",
                sectionBackground:
                    "url('/assets/section-background.png')",

                'hero-radial':
                    'radial-gradient(circle at top right, rgba(42, 194, 242, 0.22), transparent 42%)',

                'ocean-gradient':
                    'linear-gradient(135deg, #071b2d 0%, #0b3650 55%, #0c83ae 100%)',
            },

            boxShadow: {
                soft: '0 18px 50px -24px rgba(7, 27, 45, 0.28)',
                card: '0 20px 60px -32px rgba(7, 27, 45, 0.35)',
                elevated: '0 24px 70px -28px rgba(7, 27, 45, 0.45)',
            },

            borderRadius: {
                card: '1.25rem',
                panel: '1.75rem',
            },

            maxWidth: {
                site: '80rem',
                proseWide: '48rem',
            },

            spacing: {
                18: '4.5rem',
                22: '5.5rem',
                26: '6.5rem',
                30: '7.5rem',
            },

            transitionDuration: {
                400: '400ms',
            },

            keyframes: {
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-8px)',
                    },
                },

                fadeUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },

            animation: {
                float: 'float 5s ease-in-out infinite',
                fadeUp: 'fadeUp 700ms ease-out both',
            },
        },
    },

    plugins: [forms],
};
