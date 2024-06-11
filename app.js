/**
 * @file app.js
 */


const express = require('express')
const app = express()
const {
    TodoQueryService,
    TodoListQueryService,
    TodoSaveCommandService,
    TodoDeleteCommandService,
    TodoInitializeCommandService
} = require('./application/services/todo.js')


app.use(express.json())


app.get('/todo', async (request, response) => {
    const todoList = await new TodoListQueryService().handle()
    response.status(200).json(todoList.map(x => ({
        todo_id: x.todoId,
        description: x.description,
        created_at: x.createdAt * 1
    })))
})


app.get('/todo/:todoId', async (request, response) => {
    const todo = await new TodoQueryService().handle({
        todoId: request.params.todoId
    })
    if (todo) {
        response.status(200).json({
            todo_id: todo.todoId,
            description: todo.description,
            created_at: todo.createdAt * 1
        })
    }
    else {
        response.status(400).json({})
    }
})


app.put('/todo/:todoId', async (request, response) => {
    const todo = await new TodoSaveCommandService().handle({
        todoId: request.params.todoId,
        description: request.body.description,
        createdAt: new Date()
    })
    response.status(201).json({
        todo_id: todo.todoId,
        description: todo.description,
        created_at: todo.createdAt * 1
    })
})


app.delete('/todo/:todoId', async (request, response) => {
    const todo = await new TodoDeleteCommandService().handle({
        todoId: request.params.todoId
    })
    response.status(400).json({})
})


app.listen(3000, async () => {
    await new TodoInitializeCommandService().handle()
})
