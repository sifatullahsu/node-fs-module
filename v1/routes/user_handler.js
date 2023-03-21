const express = require('express');
const userController = require('../controllers/user_controller');
const router = express.Router();


/**
   * @api {get} /users/random   Random user
   * @apiDescription Get randomly one user
   * @apiPermission Open for all - No restrictions
   *
   * @apiSuccess {Object{}} one user.
   */
router.get('/random', userController.getRendomUser);


/**
   * @api {get} /users/all   All users
   * @apiDescription Get all users
   * @apiPermission Open for all - No restrictions
   * 
   * @apiParam  {Number{1-}}         [limit=10]     Limit records
   *
   * @apiSuccess {Object[]} all users.
   */
router.get('/all', userController.getAllUser);


/**
 * @api {post} /users/save   Create a user
 * @apiDescription Create a new user record
 * @apiPermission Open for all - No restrictions
 *
 * @apiBody {Object{}} Object properties should be gender, name, contact, address, photoUrl
 *
 * @apiSuccess {Object{}} success message.
 *
 * @apiError (Unauthorized 400)  Unauthorized  data validation error
 */
router.post('/save', userController.saveUser);


/**
 * @api {patch} /users/update   Update user
 * @apiDescription Update a specific user record
 * @apiPermission Open for all - No restrictions
 *
 * @apiParam  {ObjectId}         [id=objectid]     query id
 *
 * @apiBody {Object{}} Object should be any of these properties gender, name, contact, address, photoUrl
 * 
 * @apiSuccess {Object[]} success message.
 *
 * @apiError (Unauthorized 400)  Unauthorized  query id validation error
 */
router.patch('/update', userController.updateUser);


/**
 * @api {patch} /users/bulk-update   Bult update users
 * @apiDescription Update bulk user records
 * @apiPermission Open for all - No restrictions
 *
 * @apiBody {Array of Object[{}]} Object should be any of these properties id*, gender, name, contact, address, photoUrl
 *
 * @apiSuccess {Object[]} success message.
 *
 * @apiError (Unauthorized 400)  Unauthorized  data validation error
 */
router.patch('/bulk-update', userController.updateBulkUser);


/**
 * @api {delete} /user/delete   Delete user
 * @apiDescription Delete a specific user record
 * @apiPermission Open for all - No restrictions
 *
 * @apiParam  {ObjectId}         [id=objectid]     query id
 *
 * @apiSuccess {Object[]} success message.
 *
 * @apiError (Unauthorized 400)  Unauthorized  query id validation error
 */
router.delete('/delete', userController.deleteUser);




module.exports = router;