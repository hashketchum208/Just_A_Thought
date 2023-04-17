const express = require('express');
const router = express.Router();
const userController  = require('../../controllers/user');

router.post('/', userController.createUser);

router.get('/', userController.getUsers);

router.get('/:id', userController.getUserId);

router.put('/:id', userController.putUser);

router.delete('/:id', userController.deleteUser)


module.exports = router; 