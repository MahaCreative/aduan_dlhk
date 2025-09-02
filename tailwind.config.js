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
                primary: "#3A913F",
                secondary: "#A8E6A1",
                background: "#CFFFCF",
            },
        },
    },

    plugins: [forms],
};
