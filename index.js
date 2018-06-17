'use strict';
const program     = require('commander');
const { prompt }  = require('inquirer');
const Transaction = require('./models/Transaction');
const questions   = require('./scripts/questions');

const run = {
    getAll() {
        return Transaction.getAll();
    },
    add() {
        return prompt(questions.construction)
        .then(answers => {
            const { email, product} = answers;
            const data = { email, product };
            return Transaction.add(data);
            // return answer.email();
        });
    }
};

program
    .version('0.0.1')
    .description('Transaction management system');

program
    .command('addBlock <email> <product>')
    .alias('a')
    .description('Add a new transaction')
    .action((email, product) => {
        let B = new Block(Date.now(), { email, product });
        Transaction.add(B);
    });

program
    .command('getTransactionList')
    .alias('ls')
    .description('Get transactions list')
    .action(() => Transaction.getAll());

program
    .command('getTransaction <id>')
    .alias('g')
    .description('Get transactions')
    .action(name => Transaction.get(name));

program
    .command('start')
    .alias('s')
    .description('Start')
    .action(() => {
        prompt(questions.actions)
        .then(answer => run[answer.action]() );
    });
  
  program.parse(process.argv);