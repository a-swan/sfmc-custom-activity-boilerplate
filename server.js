require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");

const app = express();
const { config } = require("dotenv");

const routes = require("./routes");
// const router = require("./routes/index");
const activity = require("./routes/activity");

// Needs to be configured with CSP(Content Security Policy) for SFMC
// https://stackoverflow.com/questions/21048252/nodejs-where-exactly-can-i-put-the-content-security-policy
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: "'self'",
        frameAncestors: [
          "https://mc.s50.exacttarget.com",
          "https://jbinteractions.s50.marketingcloudapps.com/",
        ],
        scriptSrc: ["'self'", "https://cdnjs.cloudflare.com/"],
        styleSrc: ["'self'", "https://cdnjs.cloudflare.com/"],
        fontSrc: ["'self'", "https://cdnjs.cloudflare.com/"],
        imgSrc: ["'self'", "data:"],
      },
    },
    frameguard: false,
    crossOriginResourcePolicy: false,
  })
);

// Register middleware that parses the request payload.
app.use(bodyParser.raw({ type: "application/jwt" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// Connect all our routes to our application
app.use(express.static(path.join(__dirname, "public")));

// HubExchange Routes
// app.get("/", routes.index );
// app.get("/index.html", routes.index );
// app.get("/config.json", routes.getConfig );

// Set 404 page
// Custom Hello World Activity Routes
app.post("/journeybuilder/save/", activity.save );
app.post("/journeybuilder/validate/", activity.validate );
app.post("/journeybuilder/publish/", activity.publish );
app.post("/journeybuilder/execute/", activity.execute );

const port = process.env.PORT || 80;

app.set("port", process.env.PORT || 80);

const server = app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});