var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user')
const { body } = require('express-validator');


/* GET users listing. */
router.get('/', UserController.findAll);
router.get('/:id',UserController.findOne);
router.post('/', [
  body('firstname').notEmpty(),
  body('lastname').notEmpty(),
  body('email_id').isEmail().notEmpty(),
  body('password').notEmpty(),
],UserController.create);
router.put('/:id', [
  body('firstname').notEmpty(),
  body('lastname').notEmpty(),
  body('email_id').notEmpty().isEmail(),
  body('password').notEmpty(),
],UserController.update);
router.delete('/:id',UserController.delete);

module.exports = router;
