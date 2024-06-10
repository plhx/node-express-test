/**
 * @file adapter.js
 */


const sqlite3 = require('sqlite3')


/* abstract */ class IDatabaseAdapter {
    /**
     * @param {string} sql
     * @param  {Object<string, any>} params
     * @returns {Promise}
     */
    async run(sql, params = {}) {
        throw new Error('Not implemented')
    }

    /**
     * @param {string} sql
     * @param  {Object<string, any>} params
     * @returns {Promise<any>}
     */
    async get(sql, params = {}) {
        throw new Error('Not implemented')
    }

    /**
     * @param {string} sql
     * @param  {Object<string, any>} params
     * @returns {Promise<Array<any>>}
     */
    async all(sql, params = {}) {
        throw new Error('Not implemented')
    }
}


module.exports = { IDatabaseAdapter }
