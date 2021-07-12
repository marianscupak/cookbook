const router = require('express').Router();
const fetch = require('node-fetch');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const Star = require('../models/Star');
const findImages = require('../utils').findImages;

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
            const recipeObjects = [];
            recipes.forEach((recipe) => {
              recipeObjects.push(recipe.toObject());
            });
            
            recipeObjects.forEach((recipe) => {
              const images = findImages(recipe._id);
              recipe.images = images;
            });
            return res.send({
              success: true,
              recipes: recipeObjects
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
  Recipe.find({}, (err, recipes) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: "Error: Server error."
      });
    }
    const recipeObjects = [];
    recipes.forEach((recipe) => {
      recipeObjects.push(recipe.toObject());
    });
    
    recipeObjects.forEach((recipe) => {
      const images = findImages(recipe._id);
      recipe.images = images;
    });

    (async () => {
      try {
        const users = await Promise.all(recipeObjects.map(recipe => User.findById(recipe.userId)));
        users.forEach((user, index) => {
          if (user) {
            recipeObjects[index].author = user.username;
          }
          else {
            recipeObjects[index].author = "Anonymous";
          }
        });
        return res.send({
          success: true,
          recipes: recipeObjects
        });
      }
      catch(err) {
        return res.send({
          success: false,
          message: "Error: Server error."
        })
      }
    })();
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

router.route('/popular').get((req, res) => {
  Star.aggregate([
    { $group : { _id: "$recipe", count: {$sum: 1} } },
    { $sort: { count: -1 } },
    { $limit: 8 }
  ])
  .then((recipes, err) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error."
      });
    }
    else {
      Recipe.find({
        _id: { $in : recipes.map(recipe => recipe._id)}
      }, (err, recipes) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error."
          });
        }
        const recipeObjects = [];
        recipes.forEach((recipe) => {
          recipeObjects.push(recipe.toObject());
        });

        recipeObjects.forEach((recipe) => {
          const images = findImages(recipe._id);
          recipe.images = images;
        })

        return res.send({
          success: true,
          recipes: recipeObjects
        });
      })
    }
  });
})

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  Recipe.findById(id, (err, recipe) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error."
      });
    }
    
    const images = findImages(recipe.id);

    User.findById(recipe.userId, (err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error."
        });
      }
      return res.send({
        success: true,
        recipe: recipe,
        images,
        author: user ? user.username : "Anonymous"
      });
    })
    
  })
});

router.route('/stars').post((req, res) => {
  const { body } = req;
  const { recipeId } = body;

  Star.countDocuments({
    recipe: recipeId
  }, (err, count) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error."
      });
    }
    return res.send({
      success: true,
      count
    });
  })
});

module.exports = router;