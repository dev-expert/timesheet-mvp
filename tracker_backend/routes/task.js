var express = require('express');
var router = express.Router();
var TaskController = require('../controllers/task')
const { body } = require('express-validator');

/* GET task listing. */
router.get('/', TaskController.findAll);
router.get('/:id',TaskController.findOne);
router.post('/', [
    body('project_id').notEmpty().withMessage('project_id is required').isNumeric().withMessage('project_id must be numeric'),
    body('description').notEmpty(),
    body('start_datetime').notEmpty(),
    body('end_datetime').notEmpty(),
    body('is_billable').notEmpty().isBoolean(),
    body('user_id').notEmpty().isNumeric()
],TaskController.create);
router.put('/:id', [
    body('project_id').notEmpty().isNumeric(),
    body('description').notEmpty(),
    body('start_datetime').notEmpty(),
    body('end_datetime').notEmpty(),
    body('is_billable').notEmpty().isBoolean(),
    body('user_id').notEmpty().isNumeric()
],TaskController.update);
router.delete('/:id',TaskController.delete);

module.exports = router;
