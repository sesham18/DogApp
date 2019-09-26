const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {DogApp} = require('./models');

// we're going to add some recipes to Recipes
// so there's some data to look at
DogApp.create(
  'Spot', '3', 'M');
DogApp.create(
  'Kelly', '10', 'F');


router.get('/', (req, res) => {
  res.json(DogApp.get());
});

router.post('/', jsonParser, (req, res) => {
  
  const requiredFields = ['name', 'age', 'gender'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = DogApp.create(req.body.name, req.body.age, req.body.gender);
  res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
  DogApp.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['name', 'age', 'id', 'gender'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating doggone item \`${req.params.id}\``);
  const updatedItem = DogApp.update({
    id: req.params.id,
    name: req.body.name,
    gender: req.body.gender, 
    age: req.body.age
  });
  res.status(204).end();
})

module.exports = router;