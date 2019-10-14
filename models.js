'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dogSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Gender: { type: String, required: true },
  Age: { type: String, required: true },

});

dogSchema.methods.serialize = function() {
  return {
    id: this._id,
    Name: this.Name,
    Gender: this.Gender,
    Age: this.Age,
  };
};

const Dog = mongoose.model("Dog", dogSchema);

module.exports = { Dog };
























const uuid = require('uuid');

var ID = function () {
  return Math.random().toString(36).substr(2, 9);
};


const DogApp = {
    create: function(name, age, gender) {
      console.log("Creating doggone item");
      const item = {
        name: name,
        id: ID(),
        gender: gender, 
        age: age
      };
      this.items[item.id] = item;
      return item;
    },
    get: function() {
      console.log("Retrieving items");
      return Object.keys(this.items).map(key => this.items[key]);
    },
    delete: function(id) {
      console.log("Deleting item");
      delete this.items[id];
    },
    update: function(updatedItem) {
      console.log("Deleting item");
      const {id} = updatedItem;
      if (!(id in this.items)) {
        throw StorageException(
          `Can't update item \`${id}\` because doesn't exist.`)
      }
      this.items[updatedItem.id] = updatedItem;
      return updatedItem;
    }
  };

  function createDogApp() {
    const storage = Object.create(DogApp);
    storage.items = {};
    return storage;
  }

  module.exports = {
    DogApp: createDogApp()
  }
  
