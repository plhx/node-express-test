/**
 * @file dependencies.js
 */


const sqlite3 = require('sqlite3')
const { IDatabaseAdapter } = require('./application/adapters.js');
const { ITodoRepository } = require('./domain/repositories/i-todo-repository.js');
const { SqliteDatabaseAdapter} = require('./infra/adapters.js')
const { TodoRepository } = require('./infra/repositories/todo-repository.js');


class DependencyBuilder {
    constructor() {
        this._db = new sqlite3.Database('todo.db')
    }

    get(type) {
        const builder = {
            [IDatabaseAdapter]: () => new SqliteDatabaseAdapter(this._db),
            [ITodoRepository]: () => new TodoRepository(this.get(IDatabaseAdapter))
        }[type]
        if (builder) {
            return builder()
        }
    }
}


module.exports = { Dependency: new DependencyBuilder() }
