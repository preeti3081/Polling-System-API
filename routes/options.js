const express = require('express');
const router = express.Router();
const optionController = require('../controllers/options');

router.delete('/:id/delete',optionController.delete);
router.post('/:id/add_vote',optionController.addvote);

module.exports = router;