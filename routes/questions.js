const express = require('express');
const router = express.Router();
const pollingController = require('../controllers/polling');

router.post('/create',pollingController.create);
router.get('/:id',pollingController.view);
router.delete('/:id/delete',pollingController.delete);
router.post('/:id/options/create',pollingController.opt);

module.exports = router;