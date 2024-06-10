/**
 * @file adapters.js
 */


const sqlite3 = require('sqlite3')
const { IDatabaseAdapter } = require("../application/adapters");


class SqliteDatabaseAdapter extends IDatabaseAdapter {
    /**
     * @param {sqlite3.Database} adapter
     */
    constructor(adapter) {
        super()
        this._adapter = adapter
    }

    /**
     * @param {string} sql
     * @param {Object<string, any>} params
     * @returns {Promise}
     */
    async run(sql, params = {}) {
        return await new Promise((resolve, reject) => {
            const statement = this._adapter.prepare(sql)
            statement.run(params, (result, error) => {
                error ? reject(error) : resolve(result)
            })
        })
    }

    /**
     * @param {string} sql
     * @param {Object<string, any>} params
     * @returns {Promise<Array<any>>}
     */
    async get(sql, params = {}) {
        return await new Promise((resolve, reject) => {
            const statement = this._adapter.prepare(sql)
            statement.get(params, (_, result, error) => {
                error ? reject(error) : resolve(result)
            })
        })
    }

    /**
     * @param {string} sql
     * @param {Object<string, any>} params
     * @returns {Promise<Array<any>>}
     */
    async all(sql, params = {}) {
        return await new Promise((resolve, reject) => {
            const statement = this._adapter.prepare(sql)
            statement.all(params, (_, result, error) => {
                error ? reject(error) : resolve(result ?? [])
            })
        })
    }
}


module.exports = { SqliteDatabaseAdapter }
