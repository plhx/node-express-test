/**
 * @file i-todo-repository.js
 */


/* abstract */ class ITodoRepository {
    /**
     * @returns {Promise}
     */
    async initialize() {
        throw new Error('Not implemented')
    }

    /**
     * @param {string} todoId
     * @returns {Promise<Todo>}
     */
    async get(todoId) {
        throw new Error('Not implemented')
    }

    /**
     * @returns {Promise<Array<Todo>>}
     */
    async getAll() {
        throw new Error('Not implemented')
    }

    /**
     *
     * @param {Todo} todo
     * @returns {Promise}
     */
    async save(todo) {
        throw new Error('Not implemented')
    }

    /**
     * @param {Todo} todo
     * @returns {Promise}
     */
    async delete(todo) {
        throw new Error('Not implemented')
    }
}


module.exports = { ITodoRepository }
