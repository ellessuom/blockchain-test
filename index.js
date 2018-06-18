'use strict';
const program     = require('commander');
const { prompt }  = require('inquirer');
const Transaction = require('./models/Transaction');
const questions   = require('./scripts/questions');
const Q = require('q');

const run = {
    getAll() {
        return Transaction.getAll(true)
        .then(list => {
            console.info(list.join('\n-----------------\n'));
            return Q.resolve(list);
        });
    },
    add() {
        return prompt(questions.construction)
        .then(answers => {
            const { email, product} = answers;
            const data = { email, product };
            return Transaction.add(data);
        });
    },
    get() {
        let field;
        return prompt(questions.query_type)
        .then(answers => {
            field = answers.query;
            return prompt(questions.query[field]);
        })
        .then(answers => {
            const d = Q.defer();

            let query = {};
            query[field] = { 'in': answers.value };
            Transaction.get(query)
            .then((transactions, err) => {
                if (err) {
                    return d.reject(err);
                }
                console.log('transactions found!:')
                console.log(transactions)
                d.resolve(transactions);
            })
            .fail(err => {
                return d.reject(err);
            })
            return d.promise;
        });
    }
};

program
    .version('0.0.1')
    .description('Transaction management system');

program
    .command('start')
    .alias('s')
    .description('Start script')
    .action(() => {
        prompt(questions.actions)
        .then(answer => run[answer.action]())
        .then(() => {
            console.info('Process completed!');
            process.exit(1);
        });
    });

program.parse(process.argv);