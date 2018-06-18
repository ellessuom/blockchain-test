const Q = require('q');
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
 * @function  [initialize] Creates the genesis block
 * @returns {Object|Promise}
 */
const initialize = () => {
    const d = Q.defer();

    let transaction = new Block({});
    Transaction.create(transaction, err => {
        if (err) {
            console.err('Error while trying to create the genesis block');
            return d.reject(err);
        }
        console.info('Genesis block created!');
        d.resolve(transaction);
    });
    return d.promise;
};

/**
 * @function  [add] Add a new block to the chain
 * @param {Object} data
 * @returns {Object|Promise}
 */
const add = data => {
    let transactions;
    return getAll()
    .then(res_transactions => {
        let p = Q.resolve();
        transactions = res_transactions;
        if (!transactions.length) {
            p = initialize();
        }

        return p;
    })
    .then(genesis => {
        const d = Q.defer();
        let last = genesis;
        if (!genesis) {
            last = transactions[transactions.length -1];
        }

        data.previousHash = last.hash;
        data.index = last.index + 1;

        let transaction = new Block(data);
        Transaction.create(transaction, err => {
            if (err) {
                console.err('Error while trying to create a new transaction');
                return d.reject(err);
            }
            console.info('New block added!');
            d.resolve();
        });

        return d.promise;
    });
};
const parseTransaction = transaction => {
    return `Date: ${new Date(transaction.time)}\nBuyer: ${transaction.data.email}\nProduct: ${transaction.data.product}`;
};

const fetch = (query, to_parse) => {
    const d = Q.defer();
    if (!query) {
        query = null;
    }
    console.info('Fetching transactions...');
    Transaction.find(query).sort('time')
    .exec((err, transactions) => {
        if (err) {
            console.err('Error while trying to fetch transaction list');
            return d.reject(err);
        }
        if (!transactions.length) {
            console.info('No transactions found!');
            return d.resolve([]);
        }
        d.resolve(to_parse? transactions.map(t => parseTransaction(t)) : transactions);
    });

    return d.promise;
};

/**
 * @function  [getAll]
 * @returns {Json} product
 */
const getAll = (to_parse) => {
    return fetch(null, to_parse);
};

/**
 * @function  [get]
 * @returns {Json} product
 */
const get = (query, to_parse) => {
    return fetch(query, to_parse);
};

// Export all methods
module.exports = {
    add,
    get,
    getAll
};