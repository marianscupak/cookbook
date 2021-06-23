const router = require('express').Router();
const fetch = require('node-fetch');
const Recipe = require('../models/Recipe');

router.route('/').post((req, res) => {
  const { body } = req;
  const { token } = body;

  if (token) {
    fetch("http://localhost:5000/api/verify?token=" + token)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const userId = json.user.id;

          Recipe.find({
            userId
          }, (err, recipes) => {
            if (err) {
              return res.send({
                  success: false,
                  message: "Error: Server error."
              });
            }
            return res.send({
              success: true,
              recipes
            });
          })
        }
      })
    }
});

router.route('/add').post((req, res) => {
    const { body } = req;
    const { token, recipe } = body;

    if (token) {
      fetch("http://localhost:5000/api/verify?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            let newRecipe = new Recipe();

            newRecipe.name = recipe.name;
            newRecipe.description = recipe.description;
            newRecipe.ingredients = recipe.ingredients;
            newRecipe.steps = recipe.steps;
            newRecipe.userId = json.user.id;

            newRecipe.save((err, doc) => {
              if (err) {
                return res.send({
                  success: false,
                  message: "Error: Server error."
                });
              }
              return res.send({
                success: true,
                recipe: doc
              });
            });
          } else {
            return res.send({
              success: false,
              message: "Error: Not authenticated."
            });
          }
        })
        .catch(e => {
          console.log(e);
        })
    }
    else {
      return res.send({
        success: false,
        message: "Error: Not authenticated."
      });
    }
});

module.exports = router;