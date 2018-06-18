const Q = require('q');
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const questions   = require('./questions');
const { prompt }  = require('inquirer');

module.exports = {
    add() {
        return prompt(questions.creation)
        .then(answers => {
            const { email, product} = answers;
            return Transaction.add({ email, product });
        });
    },
    getAll() {
        return Transaction.getAll(true)
        .then(list => {
            console.info(list.join(`\n${'-'.repeat(10)}\n`));
            return Q.resolve(list);
        });
    },
    get() {
        let field;
        return prompt(questions.query_field)
        .then(answers => {
            field = answers.query;
            return prompt(questions.query_field_value[field]);
        })
        .then(answers => {
            let query = {};
            if (field === 'index') {
                query.index = answers.value;
            } else {
                query = { [ field ] : { '$regex': answers.value, '$options': 'i' } };
            }

            return Transaction.get(query, true)
            .then(list => {
                console.info(list.join(`\n${'-'.repeat(10)}\n`));
                return Q.resolve(list);
            });
        });
    },
    addProduct() {
        return prompt(questions.product_creation)
        .then(answers => {
            const { name, category, price } = answers;
            return Product.add({ name, category, price });
        });
    },
    getAllProducts() {
        return Product.getAll()
        .then(list => {
            console.info(list.join(`\n${'-'.repeat(10)}\n`));
            return Q.resolve(list);
        });
    
    }
};