const express = require('express');
const { listAction, deleteAction, formAction, saveAction } = require('./controller');

const router = express.Router();

router.get('/', listAction);
router.get('/delete/:id', deleteAction);
router.get('/form/:id?', formAction);
router.post('/save', saveAction);

module.exports = router;