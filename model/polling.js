const mongoose = require('mongoose');
const Option = require('./option'); // Import the Option schema

const pollingSchema = new mongoose.Schema({
    title: {
      type: String,
    },
    option: [Option.schema], 
});

const Question = mongoose.model('Question', pollingSchema);
module.exports = Question;