const router = require('express').Router();
const fetch = require('node-fetch');
const Recipe = require('../models/Recipe');
const fs = require('fs');

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
            const images = []
            for (index in recipes) {
              images.push([]);
              const recipe = recipes[index];
              fs.readdirSync(`public/${recipe.id}`).forEach(file => {
                images[index].push(file);
              });
            }
            return res.send({
              success: true,
              recipes,
              images
            });
          })
        }
      })
    }
    else {
      return res.send({
        success: false,
        message: "Error: Not authenticated."
      });
    }
});

router.route('/').get((req, res) => {
  Recipe.find({})
  .then((recipes, err) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: "Error: Server error."
      });
    }
    const images = [];
    for (index in recipes) {
      images.push([]);
      const recipe = recipes[index];
      fs.readdirSync(`public/${recipe.id}`).forEach(file => {
        images[index].push(file);
      });
    }
    return res.send({
      success: true,
      recipes,
      images
    });
  })
})

router.route('/add').post((req, res) => {
    const { body } = req;
    const { token } = body;
    const recipe = JSON.parse(body.recipe);

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

              fs.mkdir(`public/${doc.id}`, (e) => {
                if (e) throw e;
              });

              for (const file in req.files) {
                const newPath = `public/${doc.id}/image${file}.${req.files[file].originalname.substr(-3, 3)}`;

                fs.rename(req.files[file].path, newPath, (e) => {
                  if (e) throw e;
                })
              }
              return res.send({
                success: true,
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