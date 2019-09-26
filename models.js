const uuid = require('uuid');

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}


const DogApp = {
    create: function(name, age, gender) {
      console.log('Creating new shopping list item');
      const item = {
        name: name,
        id: uuid.v4(),
        gender: gender, 
        age: age
      };
      this.items[item.id] = item;
      return item;
    },
    get: function() {
      console.log('Retrieving doggone items');
      return Object.keys(this.items).map(key => this.items[key]);
    },
    delete: function(id) {
      console.log(`Deleting doggone item \`${id}\``);
      delete this.items[id];
    },
    update: function(updatedItem) {
      console.log(`Deleting doggone item \`${updatedItem.id}\``);
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
  
