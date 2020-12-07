// Packages
require("dotenv").config(); // env variables
const express = require("express");
const app = express();
const http = require("http");
const https = require("https");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const device = require("express-device");
const sitemap = require("express-sitemap")();
// Databases
var User = require("./models/user");

//USE
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000 }));
app.use(device.capture()); // DEVICE INFO
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [process.env.COOKIE_SECRET] }));

//SEND TO EVERY PAGE
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    res.locals.isMobile = req.device.type == "phone";
    next();
});

//DATABASE
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("DATABASE CONNECTED");
});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// HOME / LOGIN
app.get("/", function (req, res) {
    if (req.user) {
        res.render("./_mobile/user/dashboard.ejs");
    } else {
        res.render("home.ejs");
    }
});



// AUTHENTICATION

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