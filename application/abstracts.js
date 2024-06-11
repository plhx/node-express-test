/**
 * @file abstracts.js
 */


/* abstract */ class IService {
    /**
     * @param {Object} args
     * @returns {Promise<any>}
     */
    async handle(args) {
        throw new Error('Not implemented')
    }
}


module.exports = { IService }
