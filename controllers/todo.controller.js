const User = require("../models/User");
require("dotenv").config();
const Todo = require("../models/Todo");
const { default: mongoose } = require("mongoose");

module.exports = class TodoController {
  static async create(req, res, next) {
    try {
      const { name } = req.body;
      const user = await User.findOne({ _id: req.user._id });
      const todo = await Todo.create({ name, date: Date.now(), user });
      await todo.save()

      await user.todos.push(mongoose.Types.ObjectId(todo._id));

      await user.save();
      return res.status(200).json(todo);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }

  static async getTodos(req, res) {
    try {
      const todos = await Todo.find({ user: req.user._id });
      return res.json({
        todos,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }

  static async modifyName(req, res) {
    try {
      const { name, _id } = req.body;
      const todo = await Todo.findOne({ _id });
      todo.name = name;
      await todo.save();
      return res.status(200).json(todo);
    } catch (e) {
      console.log(e);
      return res.json({
        error: e,
      });
    }
  }

  static async setIsDone(req, res) {
    try {
      const { isDone, _id } = req.body;
      const todo = await Todo.findOne({ _id });
      if (!todo) {
        throw new Error(`Todo wasn't found`);
      }
      todo.isDone = isDone;
      await todo.save();
      return res.status(200).json(todo);
    } catch (e) {
      console.log(e);
      return res.json({
        error: e,
      });
    }
  }

  static async deleteTodo(req, res) {
    try {
      const { _id } = req.query;
      const todo = await Todo.findOne({ _id });
      await todo.remove();
      return res.status(200).json({
        message: "Deleted todo successfully",
      });
    } catch (e) {
      console.log(e);
      return res.json({
        error: e,
      });
    }
  }
};
