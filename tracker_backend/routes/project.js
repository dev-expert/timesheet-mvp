var express = require('express');
var router = express.Router();
var ProjectController = require('../controllers/project')
const { body } = require('express-validator');
console.log("ProjectController",ProjectController)
/* GET project listing. */
router.get('/', ProjectController.findAll);
router.get('/:id',ProjectController.findOne);
router.post('/', [
    body('project_name').notEmpty(),
    body('description').notEmpty(),
    body('client_id').notEmpty().isNumeric()
],ProjectController.create);
router.put('/:id', [
    body('project_name').notEmpty(),
    body('description').notEmpty(),
    body('client_id').notEmpty().isNumeric()
],ProjectController.update);
router.delete('/:id',ProjectController.delete);

module.exports = router;
