const Question = require('../model/polling');


//creating new question
module.exports.create = async function(req,res){
    const data = new Question({
        title: req.body.title,
        option: req.body.option,
    })
    await data.save();
    console.log(req.body);
    res.status(200).json({
        success: true,
        body: data,
    })
}

//view all saved questions
module.exports.view = async function(req,res){
    try{
        let id = req.params.id;
        const data = await Question.findById(id);
        console.log(data);
        res.status(200).json({
        success: true,
        body: data,
    })
    }catch(err){
        if(err){console.log(err)}
    }
}

//(To delete a question)
module.exports.delete = async function (req, res) {
  try {
    const id = req.params.id;
    const deletedData = await Question.findByIdAndDelete(id);
    res.json({
      success: true,
      body: deletedData,
      message: 'Deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting data',
    });
  }
}

// /questions/:id/options/create (To add options to a specific question)
module.exports.opt = async function(req, res) {
  try {
    // Extract question ID from request parameters
    const quesId = req.params.id;

    // Find the corresponding question by ID
    const ques = await Question.findById(quesId);

    // Extract option data from the request body
    const { text,link_to_vote } = req.body;

    // Create a new option
    const option = {
      text : text,
      vote : 0, // Initialize votes to zero, assuming it starts with no votes
      link_to_vote: `http://localhost:8000/options/${quesId}/add_vote`, 

    };

    // Push the new option to the question's options array
    ques.option.push(option);

    // Save the updated question with the new option
    await ques.save();

    res.status(200).json(option);
  } catch (error) {
    console.log('failed to create option',error)
  }
};

    