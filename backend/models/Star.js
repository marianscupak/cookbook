const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const starSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }
});

const Star = mongoose.model('Star', starSchema);
module.exports = Star;