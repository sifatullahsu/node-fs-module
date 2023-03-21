const express = require('express');
const { userValidation } = require('../../utilities/validations');
const userController = require('../controllers/user_controller');
const router = express.Router();


router.get('/random', userController.getRendomUser);
router.get('/all', userController.getAllUser);
router.post('/save', userController.saveUser);

router.patch('/update', userController.updateUser);
router.patch('/bulk-update', userController.updateBulkUser);
router.delete('/delete', userController.deleteUser);


module.exports = router;