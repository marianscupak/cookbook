const router = require('express').Router();
const fetch = require('node-fetch');
const Star = require('../models/Star');
const Recipe = require('../models/Recipe');
const findImages = require('../utils').findImages;

router.route('/toggle').post((req, res) => {
  const { body } = req;
  const { token, recipeId } = body;

  if (token) {
    fetch("http://localhost:5000/api/verify?token=" + token)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const userId = json.user.id;

          const existingStar = Star.findOneAndDelete({
            recipe: recipeId,
            user: userId
          }, (err, doc) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error: Server error."
              });
            }
            if (doc) {
              return res.send({
                success: true,
                message: "Star removed."
              });
            }
            const newStar = new Star();

            newStar.user = userId;
            newStar.recipe = recipeId;

            newStar.save((err, star) => {
              if (err) {
                  return res.send({
                      success: false,
                      message: "Error: Server error."
                  });
              }
              return res.send({
                success: true,
                message: "Recipe starred.",
                star
              });
            });
          })
        }
        else {
          return res.send({
            success: false,
            message: "Error: Not authenticated."
          });
        }
      });
  }
  else {
    return res.send({
      success: false,
      message: "Error: Not authenticated."
    });
  }
});

router.route('/check').post((req, res) => {
  const { body } = req;
  const { token, recipeId } = body;

  if (token) {
    fetch("http://localhost:5000/api/verify?token=" + token)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const userId = json.user.id;

          const existingStar = Star.findOne({
            recipe: recipeId,
            user: userId
          }, (err, doc) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error: Server error."
              });
            }
            if (doc) {
              return res.send({
                success: true,
                star: true
              });
            }
            return res.send({
              success: true,
              star: false
            });
          })
        }
        else {
          return res.send({
            success: false,
            message: "Error: Not authenticated."
          });
        }
      });
  }
  else {
    return res.send({
      success: false,
      message: "Error: Not authenticated."
    });
  }
});

router.route('/recipes').post((req, res) => {
  const { body } = req;
  const { token } = body;

  if (token) {
    fetch("http://localhost:5000/api/verify?token=" + token)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const userId = json.user.id;

          Star.find({user: userId}, (err, stars) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error: Server error."
              });
            }
            const ids = [];

            stars.forEach((star) => {
              ids.push(star.recipe);
            });

            Recipe.find({'_id': {
              $in: ids
            }}, (err, recipes) => {
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
            });
          });
        }
        else {
          return res.send({
            success: false,
            message: "Error: Not authenticated."
          });
        }
      });
  }
  else {
    return res.send({
      success: false,
      message: "Error: Not authenticated."
    });
  }
});

module.exports = router;