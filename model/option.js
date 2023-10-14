const mongoose = require('mongoose');
const question = require('./polling');

const optionSchema = new mongoose.Schema({
  text: String,
  vote: {
    type: Number,
    default: 0
  },
  link_to_vote: String,
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question' // Reference to the Question schema
  }
});

const Option = mongoose.model('Option', optionSchema);
module.exports = Option;
