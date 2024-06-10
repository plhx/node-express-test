/**
 * @file todo.js
 */


class Todo {
    /**
     * @param {Object} args
     * @param {string} args.todoId
     * @param {string} args.description
     * @param {Date} args.createdAt
     */
    constructor({todoId, description, createdAt}) {
        this.todoId = todoId
        this.description = description
        this.createdAt = createdAt
    }
}


module.exports = { Todo }
