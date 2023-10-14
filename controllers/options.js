const Option = require('../model/option');
const Question = require('../model/polling');

//To delete an option
// module.exports.delete = async function (req, res) {
//     try {
//         const id = req.params.id;
//         const deletedData = await Question.option.findByIdAndDelete(id);
//         res.json({
//             success: true,
//             body: deletedData,
//             message: 'Option Deleted successfully',
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting data',
//         });
//     }
// }

module.exports.delete = async function (req, res) {
  try {
      const optionId = req.params.id; // Assuming you have a route parameter for the option ID

      // Find the question that contains the option you want to delete
      const question = await Question.findOne({ 'option._id': optionId });

      // Find the index of the option within the options array
      const optionIndex = question.option.findIndex(option => option._id == optionId);

      // Remove the option from the options array
      question.option.splice(optionIndex, 1);

      // Save the updated question document
      await question.save();

      res.json({
          success: true,
          message: 'Option Deleted successfully',
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          message: 'Error deleting option',
      });
  }
}

//To increment the count of votes,Add a vote to a specific option
module.exports.addvote = async function (req, res) {
  try {
    
    const optionId = req.params.id; // Get the option ID from the request parameters
    
    // Find the question that contains the option you want to add votes
    const question = await Question.findOne({ 'option._id': optionId });
    
    // Find the specific option within the options array
    const option = question.option.find((opt) => opt._id == optionId);

    // Increment the votes for the option
    option.vote += 1; 
    // Save the updated question with the increased vote
    await question.save();

    res.status(200).json(option);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a vote.' });
  }
}
