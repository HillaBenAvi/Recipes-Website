const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan"); //logger in exercises
const session = require("client-sessions");
const cors = require("cors");
const path = require("path");

const axios = require("axios");
axios.defaults.withCredentials = true;

const app = express();
const port = process.env.PORT || "3005";


//routes
const user = require("./routes/user");
const recipe = require("./routes/recipe");
const auth = require("./routes/auth");

const corsConfig = {
  origin: true,
  credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(morgan("dev")); //logger
app.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(morgan(":method :url :status :response-time ms")); //print request logs

app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 20 * 60 * 1000, // expired after 20 sec
    activeDuration: 0, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
    cookie:{
      httpOnly: false
    }
  })
);

//routing
app.use("/user", user);
app.use("/recipe", recipe);
app.use(auth);


app.use((req, res) => {
    res.sendStatus(404);
});

//handle error
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
      error: {
          status: error.status || 500,
          message: error.message || 'Internal Server Error',
      },
  });
});


//check that the server is alive
app.listen(port, () => {
    console.log(`I am alive on port ${port}`);
})



