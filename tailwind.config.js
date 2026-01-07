import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                popins: ["Poppins", ...defaultTheme.fontFamily.sans],
                roboto: ["roboto", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: "#3A913F",
                    600: "#318231",
                    700: "#255d27",
                },
                secondary: {
                    DEFAULT: "#A8E6A1",
                    600: "#86c781",
                },
                background: "#CFFFCF",
                muted: "#6b7280",
            },
        },
    },

    plugins: [forms],
};
