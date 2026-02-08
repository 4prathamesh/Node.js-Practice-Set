const express = require('express');
const todoItemsRouter = express.Router();

// local Modules
const todoItemController = require('../controllers/todoItemController');

todoItemsRouter.post("/", todoItemController.createTodoItem);
todoItemsRouter.get("/", todoItemController.getAllTodoItems);
todoItemsRouter.delete("/:id", todoItemController.deleteTodoItem);
todoItemsRouter.put("/:id", todoItemController.markCompleted);

module.exports = todoItemsRouter;