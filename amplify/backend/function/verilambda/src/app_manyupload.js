/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bb = require("express-busboy");
// declare a new express app
var app = express();

//bb.extend(app)
//app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));
bb.extend(app, {
  upload: true,
});

app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/items", async function (req, res) {
  var db = require("./db");
  var fs = require("fs");

  var editorServer = require("datatables.net-editor-server");

  var Editor = editorServer.Editor;
  var Field = editorServer.Field;
  var Validate = editorServer.Validate;
  var Format = editorServer.Format;
  var Options = editorServer.Options;
  var Upload = editorServer.Upload;
  var promisify = editorServer.promisify;
  var Mjoin = editorServer.Mjoin;

  const AWS = require("aws-sdk");

  AWS.config.update({
    accessKeyId: "AKIA3AAUJ4SFIYN3SMXP",
    secretAccessKey: "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",
  });

  var s3 = new AWS.S3();

  var editor = new Editor(db, "users").fields(
    new Field("first_name"),
    new Field("last_name"),
    new Field("zip")
  );

  await editor.process(req.body, req.files);
  res.json(editor.data());
});

app.get("/items/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/items", async function (req, res) {
  var db = require("./db");
  var fs = require("fs");

  var editorServer = require("datatables.net-editor-server");

  var Editor = editorServer.Editor;
  var Field = editorServer.Field;
  var Validate = editorServer.Validate;
  var Format = editorServer.Format;
  var Options = editorServer.Options;
  var Upload = editorServer.Upload;
  var promisify = editorServer.promisify;
  var Mjoin = editorServer.Mjoin;

  const AWS = require("aws-sdk");

  AWS.config.update({
    accessKeyId: "AKIA3AAUJ4SFIYN3SMXP",
    secretAccessKey: "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",
  });

  var s3 = new AWS.S3();

  var editor = new Editor(db, "users")
    .fields(new Field("first_name"), new Field("last_name"), new Field("zip"))
    .join(
      new Mjoin("files")
        .link("users.id", "users_files.user_id")
        .link("files.id", "users_files.file_id")
        .fields(
          new Field("id").upload(
            new Upload(function (fileInfo, id) {
              const path = fileInfo.file;
              const keytofile = fileInfo.filename;
              const bucket = "datatables-editor";

              return new Promise(function (resolve, reject) {
                fs.readFile(path, function (err, data) {
                  if (err) {
                    throw err;
                  }

                  console.debug(path);

                  var base64data = Buffer.from(data, "binary").toString(
                    "base64"
                  );

                  s3.putObject(
                    {
                      Bucket: bucket,
                      Key: keytofile,
                      Body: data,
                    },
                    function (err, data) {
                      if (err) {
                        console.debug(
                          "There was an error creating file: " + err.message
                        );
                        reject("Error");
                      } else {
                        console.debug(
                          `Successfully created. Id ${id} file ${fileInfo.filename}. .... `
                        );
                        resolve(id);
                      }
                    }
                  );
                });
              });
            })
              .db("files", "id", {
                filename: Upload.Db.FileName,
                filesize: Upload.Db.FileSize,
              })
              .validator(
                Validate.fileSize(500000, "Files must be smaller than 500K")
              )
              .validator(
                Validate.fileExtensions(
                  ["png", "jpg", "gif"],
                  "Only image files can be uploaded (png, jpg and gif)"
                )
              )
          )
        )
    );

  await editor.process(req.body, req.files);
  res.json(editor.data());
});

app.post("/items/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/items", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/items/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/items", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/items/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
