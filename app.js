const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const app = express(); //express will be called to app ariable

const cors = require("cors");

//-----------------------------------------
//const dotenv = require("dotenv");
//dotenv.config();
require("dotenv").config();
//------------------------------------------

//middlewares
app.use(express.json());
//convert all data responses/middleware to json
//and allow to pass the json everywhere through the server
/* UnhandledPromiseRejectionWarning: TypeError: Cannot destructure property 'name' of 'req.body' as it is undefined.
 me error eka enawa app.use(express.json());use kare natnam*/

// const bodyParser = require('body-parser')
// app.use(bodyParser.json())

app.use("/books", router); //http://localhost:5000/

const port = process.env.PORT || 5000;
app.use(cors());

const uri = process.env.MONGO_URL;

mongoose.connect(uri, {
  maxPoolSize: 50,
  /*That what you have is a Timeout error. 
  It only suggested that it might have been caused by max pool size being reached,
  but it could have happened for many other reasons.*/

  wtimeoutMS: 2500,
  /*Corresponds to the write concern wtimeout. wtimeoutMS specifies a time limit, in milliseconds, for the write concern.
When wtimeoutMS is 0, write operations will never time out. For more information, see wtimeout.*/

  useNewUrlParser: true,
  /* The underlying MongoDB driver has deprecated their current connection string parser. */
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected Succssfully!");
});

app.use("/", (req, res, next) => {
  res.send("Application is running");
}); //main URL is "/"

app.listen(port, () => {
  console.log(`App is running on Port : ${port}`);
});
