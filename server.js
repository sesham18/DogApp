"use strict"; 

const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 
const app = express();
mongoose.Promise = global.Promise;
//app.use(express.json());

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const { PORT, DATABASE_URL, COLLECTION} = require("./config");
const { Dog } = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('public/css/'));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(DATABASE_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db('doggone-app');
        collection = database.collection("dogs");
        console.log("Connected to doggone-app");
    });
});


app.get("/doggone", (req, res) => {
  collection.find({}).toArray((error, result) => {
      if(error) {
          return res.status(500).send(error);
      }
      res.send(result);
  });
});

app.get("/doggone/:id", (req, res) => {
  collection.findOne({ "_id": new ObjectId(req.params.id) }, (error, result) => {
      if(error) {
          return res.status(500).send(error);
      }
      res.send(result);
  });
});


app.post("/doggone", (req, res) => {
  const requiredFields = ['Name', 'Gender', 'Age'];
  for (let i = 0; i<requiredFields.length; i++){
    const field = requiredFields[i]; 
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  collection.insert(req.body, (error, result) => {
      if(error) {
          return res.status(500).send(error);
      }
      console.log(req.body);
      res.send(result.result);
  });
});

app.put("/doggone/:id", (req, res) => {
  collection.update({"_id": ObjectId(req.params.id)}, { $set: {'Name': req.body.Name, 'Gender': req.body.Gender, 'Age': req.body.Age}}, (error, result) =>{
  if(error) {
    throw error; 
  }
  res.send(result);
  console.log("done"); 
  }); 
});

app.delete("/doggone/:id", (req, res) => {
  collection.deleteOne({"_id": ObjectId(req.params.id)}, (error, result) =>{
    if(error){
      return res.status(500).send(error); 
    }
    res.send(result.result); 
  })
}); 


app.get("/", (req, res) => {
  res.render("index");
});


let server;  

function runServer(DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      DATABASE_URL,
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}


if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = app;