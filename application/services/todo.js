/**
 * @file todo.js
 */


const { Dependency } = require('../../dependencies.js')
const { IDatabaseAdapter } = require('../adapters.js')
const { IService } = require('../abstracts.js')
const { ITodoRepository } = require('../../domain/repositories/i-todo-repository.js')
const { Todo } = require('../../domain/models/todo.js')
const { Transaction } = require('../transactions.js')


class TodoQueryService extends IService {
    constructor() {
        super()
        this._todoRepository = Dependency.get(ITodoRepository)
    }

    /**
     * @param {Object} args
     * @param {string} args.todoId
     * @returns {Promise<any>}
     */
    async handle(args) {
        const todo = await this._todoRepository.get(args.todoId)
        return todo
    }
}


class TodoListQueryService extends IService {
    constructor() {
        super()
        this._todoRepository = Dependency.get(ITodoRepository)
    }

    /**
     * @returns {Promise<any>}
     */
    async handle(args) {
        const todoList = await this._todoRepository.getAll()
        return todoList
    }
}


class TodoSaveCommandService extends IService {
    constructor() {
        super()
        this._adapter = Dependency.get(IDatabaseAdapter)
        this._todoRepository = Dependency.get(ITodoRepository)
    }

    /**
     * @param {Object} args
     * @param {string} args.todoId
     * @param {string} args.description
     * @param {Date} args.createdAt
     * @returns {Promise<any>}
     */
    async handle({todoId, description, createdAt}) {
        return await new Transaction(this._adapter).execute(async () => {
            const todo = new Todo({todoId, description, createdAt})
            await this._todoRepository.save(todo)
            return todo
        })
    }
}


class TodoDeleteCommandService extends IService {
    constructor() {
        super()
        this._adapter = Dependency.get(IDatabaseAdapter)
        this._todoRepository = Dependency.get(ITodoRepository)
    }

    /**
     * @param {Object} args
     * @param {string} args.todoId
     * @returns {Promise<any>}
     */
    async handle({todoId}) {
        return await new Transaction(this._adapter).execute(async () => {
            await this._todoRepository.delete(todoId)
        })
    }
}


class TodoInitializeCommandService extends IService {
    constructor() {
        super()
        this._adapter = Dependency.get(IDatabaseAdapter)
        this._todoRepository = Dependency.get(ITodoRepository)
    }

    /**
     * @returns {Promise<any>}
     */
    async handle() {
        return await new Transaction(this._adapter).execute(async () => {
            await this._todoRepository.initialize()
        })
    }
}


module.exports = {
    TodoQueryService,
    TodoListQueryService,
    TodoSaveCommandService,
    TodoDeleteCommandService,
    TodoInitializeCommandService
}
