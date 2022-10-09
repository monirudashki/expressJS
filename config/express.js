const cookieParser = require("cookie-parser");
const express = require("express");
const hbs = require("express-handlebars").create({
  extname: ".hbs",
});

const defaultTitle = require("../middlewares/defaultTitle");
const auth = require("../middlewares/auth");
const usersNavigation = require("../middlewares/usersNavigation");

const jwtSecret = "jjl4212l";

module.exports = (app) => {
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
  app.use(cookieParser());
  app.use(auth(jwtSecret));
  app.use(usersNavigation());

  app.use(defaultTitle("SoftUni Accomodation"));
};
