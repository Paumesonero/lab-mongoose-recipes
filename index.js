const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    let newRecipe = Recipe.create({
      title: 'Eggs Benedict', level: 'Amateur Chef', ingredients: ['eggs', 'bacon', 'bread', 'lemon', 'butter'],
      dishType: 'breakfast', duration: 20, creator: 'Chef Mic'
    })

    return newRecipe
  })
  .then((recipe) => {
    console.log('Created', recipe.title);
  })
  .then(() => {
    const recipesInserted = Recipe.insertMany(data)
    return recipesInserted
  })
  .then((recipesTitle) => {
    recipesTitle.forEach((el) => {
      console.log(el.title)
    })
  })
  .then(() => {
    const recipeDuration = Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    console.log('Well done, you have changed the Duration to a 100')
    return recipeDuration
  })
  .then(() => {
    const deletedRecipe = Recipe.deleteOne({ title: 'Carrot Cake' })
    console.log('You Have deleted Carrot Cake')
    return deletedRecipe
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
