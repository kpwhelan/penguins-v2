import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                membershipPageBackground: "url('assets/membership-background.jpg')",
                aboutUsPageBackground: "url('assets/about-us.jpg')",
                swimBackground: "url('assets/swim-background.jpg')",
                sectionBackground: "url('assets/section-background.png')"
            },
            colors: {
                penguinsBlue: '#2ac2f2',
            }
        },
    },

    plugins: [forms],
});
