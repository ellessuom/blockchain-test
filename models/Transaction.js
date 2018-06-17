const mongoose = require('mongoose');
const assert = require('assert');
const Block  = require('../scripts/Block');

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/test');

const transactionSchema = mongoose.Schema({
    time: {
        type: Number
    },
    data: {
        email: {
            type: String
        },
        product: {
            type: String
        },
        quantity: {
            type: Number
        },
        amount: {
            type: Number
        }
    },
    hash: {
        type: String
    },
    previousHash: {
        type: String
    },
    index: {
        type: Number
    },
    nounce: {
        type: Number
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

/**
 * @function  [add]
 * @returns {String} Status
 */
const add = data => {
    const transaction = new Block(data);

    Transaction.create(transaction, err => {
        assert.equal(null, err);
        console.log(transaction);
        console.info(`New product added!`);
    });
};

/**
 * @function  [getAll]
 * @returns {Json} product
 */
const getAll = (id) => {
    Transaction.find()
    .exec((err, transactions) => {
        assert.equal(null, err);
        console.info(transactions);
        console.info(`${transactions.length} matches`);
    });
};

/**
 * @function  [get]
 * @returns {Json} product
 */
const get = (id) => {
    Transaction.find({
        _id: id
    })
    .exec((err, transaction) => {
        assert.equal(null, err);
        console.info('Transaction list:');
        console.info(transaction);
    });
};

// Export all methods
module.exports = {
    add,
    get,
    getAll
};