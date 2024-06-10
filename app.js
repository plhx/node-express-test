/**
 * @file app.js
 */


const express = require('express')
const app = express()
const { Dependency } = require('./dependencies.js')
const { ITodoRepository } = require('./domain/repositories/i-todo-repository.js')
const { Todo } = require('./domain/models/todo.js')

const todoRepository = Dependency.get(ITodoRepository)

app.use(express.json())

app.get('/', (request, response) => {
    response.json({})
})

app.get('/todo', async (request, response) => {
    const todoList = await todoRepository.getAll()
    response.json(todoList.map(x => ({
        todo_id: x.todoId,
        description: x.description,
        created_at: x.createdAt * 1
    })))
})

app.get('/todo/:todoId', async (request, response) => {
    const todo = await todoRepository.get(request.params.todoId)
    if (todo) {
        response.json({
            todo_id: todo.todoId,
            description: todo.description,
            created_at: todo.createdAt * 1
        })
    }
    else {
        response.status(400)
    }
})

app.put('/todo/:todoId', async (request, response) => {
    const todo = new Todo({
        todoId: request.params.todoId,
        description: request.body.description,
        createdAt: new Date()
    })
    await todoRepository.save(todo)
    response.json({
        todo_id: todo.todoId,
        description: todo.description,
        created_at: todo.createdAt * 1
    })
})

app.listen(3000, async () => {
    await todoRepository.initialize()
})
