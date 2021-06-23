const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    description: {
      type: String,
      default: ''
    },
    ingredients: {
      type: [String],
      default: []
    },
    steps: {
      type: [String],
      default: []
    },
    stars: {
      type: Number,
      default: 0
    },
    userId: {
      type: String,
      default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;