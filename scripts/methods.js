const Q = require('q');
const Transaction = require('../models/Transaction');
const questions   = require('./questions');
const { prompt }  = require('inquirer');

module.exports = {
    add() {
        return prompt(questions.creation)
        .then(answers => {
            const { email, product} = answers;
            const data = { email, product };
            return Transaction.add(data);
        });
    },
    getAll() {
        return Transaction.getAll(true)
        .then(list => {
            console.info(list.join('\n-----------------\n'));
            return Q.resolve(list);
        });
    },
    get() {
        let field;
        return prompt(questions.query_field)
        .then(answers => {
            field = answers.query;
            console.log('field: ' + field);
            return prompt(questions.query_field_value[field]);
        })
        .then(answers => {
            const d = Q.defer();
            console.log('user input: ' + answers.value);

            let query = {};
            query = { [ field ] : { '$regex': answers.value, '$options': 'i' } },

            console.log('query:')
            console.log(query)
            Transaction.get(query, true)
            .then(transactions => {
                console.info(transactions.join('\n-----------------\n'));
                d.resolve(transactions);
            })
            .fail(err => {
                return d.reject(err);
            })
            return d.promise;
        });
    }
};