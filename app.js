const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
const routes = require("./routes/");
const { 
  DB_DEV,
  DB_PROD,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = require("./config/constants");
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

//Initiate our app
const app = express();
const port = process.env.PORT || 8000

// Setup cloud storage
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//Configure our app
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose Chibuokem
// mongoose.connect(isProduction ? DB_PROD : DB_DEV, { useNewUrlParser: true })
//   .then(() => console.log('DB Connected'))
//   .catch(() => console.warn('DB Connection Failed'))

//Configure Mongoose JD
mongoose
  .connect(DB_PROD, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))
  .catch(() => console.warn("DB Connection Failed"));

mongoose.set("debug", true);

//Models & routes

require("./config/passport");

app.use(routes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
