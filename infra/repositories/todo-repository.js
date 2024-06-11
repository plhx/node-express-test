/**
 * @file todo-repository.js
 */


const { IDatabaseAdapter } = require('../../application/adapters.js')
const { ITodoRepository } = require('../../domain/repositories/i-todo-repository.js')
const { Todo } = require('../../domain/models/todo.js')


class TodoRepository extends ITodoRepository {
    /**
     * @param {IDatabaseAdapter} adapter
     */
    constructor(adapter) {
        super()
        this._adapter = adapter
    }

    /**
     * @returns {Promise}
     */
    async initialize() {
        await this._adapter.run(`CREATE TABLE IF NOT EXISTS "todo" (
            "todo_id" TEXT PRIMARY KEY,
            "description" TEXT NOT NULL,
            "created_at" INTEGER NOT NULL
        )`)
    }

    /**
     * @param {string} todoId
     * @returns {Promise<Todo>}
     */
    async get(todoId) {
        const dataModel = await this._adapter.get(
            `SELECT * FROM "todo" WHERE "todo"."todo_id" = $todoId`,
            {
                $todoId: todoId
            }
        )
        return dataModel ? this._toModel(dataModel) : null
    }

    /**
     * @returns {Promise<Array<Todo>>}
     */
    async getAll() {
        const dataModels = await this._adapter.all(`SELECT * FROM "todo"`)
        return dataModels.map(x => this._toModel(x))
    }

    /**
     *
     * @param {Todo} todo
     * @returns {Promise}
     */
    async save(todo) {
        await this._adapter.run(
            `INSERT INTO "todo" VALUES ($todoId, $description, $createdAt)
                ON CONFLICT ("todo_id")
                DO UPDATE SET
                    "description" = $description,
                    "created_at" = $createdAt`,
            {
                $todoId: todo.todoId,
                $description: todo.description,
                $createdAt: todo.createdAt * 1
            }
        )
    }

    /**
     * @param {string} todoId
     * @returns {Promise}
     */
    async delete(todoId) {
        await this._adapter.run(
            `DELETE FROM "todo" WHERE "todo_id" = $todoId`,
            {
                $todoId: todoId,
            }
        )
    }

    /**
     * @param {Object} dataModel
     * @returns {Todo}
     */
    _toModel(dataModel) {
        return new Todo({
            todoId: dataModel['todo_id'],
            description: dataModel['description'],
            createdAt: new Date(dataModel['created_at'])
        });
    }
}


module.exports = { TodoRepository }
