require("dotenv").config();
module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === "production",
        content: ["./src/**/*.html", "./src/**/*.ejs", "./views/**/*.html", "./views/**/*.ejs"],
    },
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
};
