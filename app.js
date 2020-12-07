// Packages
require("dotenv").config(); // env variables
const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const sitemap = require("express-sitemap")();

//USE
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000 }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [process.env.COOKIE_SECRET] }));

//SEND TO EVERY PAGE
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

//DATABASE
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Database connected...");
});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// HOME 
app.get("/", function (req, res) {
    res.render("home.ejs");
});

//NOT FOUND PAGE
app.get("/not-found", (req, res) => {
    res.status(404).render("./not_found.ejs");
});
app.get("/*", (req, res) => {
    res.status(404).render("./not_found.ejs");
});

//GENERATE SITEMAP
sitemap.generate4(app);
sitemap.TXTtoFile();
sitemap.toFile();

module.exports(app)