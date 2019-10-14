"use strict"; 

const express = require('express');
const mongoose = require('mongoose'); 
const app = express();
mongoose.Promise = global.Promise;

//const dogRouter = require('./router'); 
//const morgan = require('morgan');
//app.use(morgan('common')); 
//app.use(express.static('public'));
app.use(express.json());
//app.use('/doggone', dogRouter);

const { PORT, DATABASE_URL } = require("./config");
const { Dog } = require("./models");

app.get("/doggone", (req, res) => {
    Dog.find()
      .limit(10)   
      .then(dogs => {
        res.json({
          dogs: dogs.map(dog => dog.serialize())
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
});

app.get("/doggone/:id", (req, res) => {
    Dog
      .findById(req.params.id)
      .then(dog => res.json(dog.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });
  
app.post("/doggone", (req, res) => {
    const requiredFields = ["Name", "Gender", "Age"];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
}
  
Dog.create({
      Name: req.body.Name,
      Gender: req.body.Gender,
      Age: req.body.Age,
    })
      .then(dog => res.status(201).json(dog.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
});
  
app.put("/doggone/:id", (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
      const message =
        `Request path id (${req.params.id}) and request body id ` +
        `(${req.body.id}) must match`;
      console.error(message);
      return res.status(400).json({ message: message });
}
  
const toUpdate = {};
const updateableFields = ["Name", "Gender", "Age"];
  
updateableFields.forEach(field => {
    if (field in req.body) {
        toUpdate[field] = req.body[field];
    }
});
  
Dog
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(dog => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});
  
app.delete("/doggone/:id", (req, res) => {
    Dog.findByIdAndRemove(req.params.id)
      .then(dog => res.status(204).end())
      .catch(err => res.status(500).json({ message: "Internal server error" }));
});


if (require.main === module) {
    app.listen(process.env.PORT || 8080, function() {
    });
}


//Catch-all
app.use("*", function(req, res) {
    res.status(404).json({ message: "Not Found" });
});
  
let server;
  
  // this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
      mongoose.connect(
        databaseUrl,
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
  
module.exports = { app, runServer, closeServer };