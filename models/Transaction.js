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
    return getAll()
    .then(transactions => {
        let p = Q.resolve();

        if (!transactions.length) {
            p = initialize();
        }

        return p.then(genesis => {
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

        });
    });
};

/**
 * @function  [getAll]
 * @returns {Json} product
 */
const getAll = (to_parse) => {
    const d = Q.defer();

    console.info('Fetching transactions...');
    Transaction.find().sort('time')
    .exec((err, transactions) => {
        if (err) {
            console.log('Error while trying to fetch transaction list');
            return d.reject(err);
        }
        d.resolve(to_parse? transactions.map(t => parseTransaction(t)) : transactions);
    });

    return d.promise;
};

/**
 * @function  [get]
 * @returns {Json} product
 */
const get = (query) => {
    const d = Q.defer();

    Transaction.find(query)
    .exec((err, transaction) => {
        if (err) {
            console.log('Error while trying to fetch a transaction');
            console.log(err);
            return d.reject(err);
        }
        d.resolve(transaction);
    });

    return d.promise;
};

const parseTransaction = transaction => {
    return `Date: ${new Date(transaction.time)}\nBuyer: ${transaction.data.email}\nProduct: ${transaction.data.product}`;
};

// Export all methods
module.exports = {
    add,
    get,
    getAll
};