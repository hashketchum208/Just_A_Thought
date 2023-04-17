const express = require('express');
const router = express.Router();
const thoughtController = require('../../controllers/thought');

router.post('/', thoughtController.postThought);

router.get('/', thoughtController.getThoughts);

router.get('/:id', thoughtController.getThoughtId);

router.put('/:id', thoughtController.putThought);

router.delete('/:id', thoughtController.deleteThought);


module.exports = router;