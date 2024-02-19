var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var userDataRouter = require("./routes/userData");
var usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

var app = express();

mongoose
  .connect(
    "mongodb+srv://bhavinkoladiya6:bk123@cluster0.tssmvej.mongodb.net/Aggregation_Stages"
  )
  .then(() => console.log("database connected !"))
  .catch((error) => console.log(error));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key", // Change this to a random string for better security
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://bhavinkoladiya6:bk123@cluster0.tssmvej.mongodb.net/Aggregation_Stages",
      collection: "mySessions",
      autoRemove: "native",
      autoRemoveInterval: 24000,
    }),
    cookie: {
      maxAge: 24000, // Session expiration time in milliseconds (e.g., 1 day)
    },
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/userData", userDataRouter);
app.use("/users", usersRouter);
app.use(cors());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
