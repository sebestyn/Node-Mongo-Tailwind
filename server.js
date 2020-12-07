// Packages
require("dotenv").config();
const http = require("http");
const https = require("https");
const app = require("./app")

// Globals
let PORT = process.env.PORT || 3000
const DOMAIN_NAME = "" // domain.hu


if (process.env.NODE_ENV === "production") {
    const privateKey = fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN_NAME}/privkey.pem`, `utf8`);
    const certificate = fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN_NAME}/cert.pem`, `utf8`);
    const ca = fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN_NAME}/chain.pem`, `utf8`);
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca,
    };
    https.createServer(credentials, app).listen(443, () => {
        console.log("HTTPS Server running on port 443");
    });
    http.createServer(function (req, res) {
        res.writeHead(301, { Location: "https://" + req.headers["host"] + req.url });
        res.end();
    }).listen(80);
} else {
    const networkLocalIP = require("ip");
    app.listen(PORT, (err) => {
        if (err) throw err;
        console.log("Started at: http://" + (networkLocalIP.address() + ":" + PORT) + " or " + ("http://localhost:" + PORT));
    });
}
