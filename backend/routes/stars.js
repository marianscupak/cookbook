const router = require('express').Router();
const fetch = require('node-fetch');
const Star = require('../models/Star');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const fs = require('fs');

router.route('/add').post((req, res) => {
  const { body } = req;
  const { token, recipeId } = body;

  if (token) {
    fetch("http://localhost:5000/api/verify?token=" + token)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const userId = json.user.id;

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
              star
            });
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