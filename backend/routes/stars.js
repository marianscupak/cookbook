const router = require('express').Router();
const fetch = require('node-fetch');
const Star = require('../models/Star');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const fs = require('fs');

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

module.exports = router;