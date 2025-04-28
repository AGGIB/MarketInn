const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

// Apply authentication middleware to all user routes
router.use(authenticate);

// Only admin can access user management routes
router.get('/', authorize(['admin']), userController.getUsers);
router.get('/:id', authorize(['admin']), userController.getUserById);
router.post('/', authorize(['admin']), userController.createUser);
router.put('/:id', authorize(['admin']), userController.updateUser);
router.delete('/:id', authorize(['admin']), userController.deleteUser);

module.exports = router; 