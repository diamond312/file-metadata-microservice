"use strict";

var express = require("express");
var cors = require("cors");

// require and use "multer"...
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

var app = express();
var fs = require("fs");

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function(req, res) {
  res.json({ greetings: "Hello, API" });
});

/** my code start **/

app.post("/api/fileanalyse", upload.single("upfile"), function(req, res, next) {
  console.log("req.file: ", req.file);
  // req.body will hold the text fields, if there were any
  let upfile = req.file;
  res.json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size
  });
});
// req.file:  {
//   fieldname: 'upfile',
//   originalname: 'efcdfc3333b974e182e0ccb71d3edae6_t.jpeg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'uploads/',
//   filename: 'c65514cea732ce9a7a9ab4d69282ca6b',
//   path: 'uploads/c65514cea732ce9a7a9ab4d69282ca6b',
//   size: 130815
// }

/** list of upload files **/
fs.readdir("./uploads", function(err, files) {
  if (err) throw err;
  console.log(files);
  /**  remove all uploads **/
  // for (const file of files) {
  //   const path = require('path');
  //   fs.unlink(path.join('./uploads', file), err => {
  //     if (err) throw err;
  //   });
  // }
});

/** my code end **/

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
