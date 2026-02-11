const express = require('express')
const Todo = require('../models/Todo.js')

const router = express.Router();

// get all todos
router.get('/todos', async (req, res) => {
    try {

        const todos =await Todo.find();
        res.status(200).json({
            success: true,
            todos: todos
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
})

// route 2 add a new todo
router.post('/todos', async (req, res)=>{
    try {

        const { text } = req.body
        console.log("ReceivedTodo: ", text);

        const newTodo = await Todo.create({ text })

        // Success response bhejo
        res.status(201).json({
            success: true,
            message: 'Todo added successfully',
            todo: newTodo
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
})

module.exports= router