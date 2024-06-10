/**
 * @file transactions.js
 */


class TransactionContext {
    /**
     *
     * @param {IDatabaseAdapter} adapter
     */
    constructor(adapter) {
        this.adapter = adapter
    }

    /**
     * @param {Function} action
     * @returns {Promise<any>}
     */
    async execute(action) {
        this.adapter.run('BEGIN')
        try {
            let result = action()
            if (result instanceof Promise) {
                result = await result
            }
            this.adapter.run('COMMIT')
            return result
        }
        catch (e) {
            this.adapter.run('ROLLBACK')
            throw e
        }
    }
}


module.exports = { TransactionContext }
