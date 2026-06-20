const express = require('express');
const router = express.Router();

// Controller se saare functions explicit import karna
const bitcoinController = require('../controllers/bitcoinController');

// Endpoints Mapping
router.get('/fetch-live', bitcoinController.getBitcoinData);
router.get('/history', bitcoinController.getAllSavedData);
router.post('/predict', bitcoinController.predictNextDay);
router.delete('/delete/:id', bitcoinController.deleteRecord);

module.exports = router;