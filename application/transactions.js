/**
 * @file transactions.js
 */


class Transaction {
    /**
     * @param {IDatabaseAdapter} adapter
     */
    constructor(adapter) {
        this._adapter = adapter
    }

    /**
     * @param {Function} action
     * @param {Object} options
     * @param {string?} options.isolation
     * @returns {Promise<any>}
     */
    async execute(action, {isolation} = {}) {
        await this._adapter.run(`BEGIN ${isolation ?? 'DEFERRED'}`)
        try {
            let result = action()
            if (result instanceof Promise) {
                result = await result
            }
            await this._adapter.run('COMMIT')
            return result
        }
        catch (e) {
            await this._adapter.run('ROLLBACK')
            throw e
        }
    }
}


module.exports = { Transaction }
