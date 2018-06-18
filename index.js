'use strict';
const program     = require('commander');
const { prompt }  = require('inquirer');
const methods   = require('./scripts/methods');
const questions   = require('./scripts/questions');

program
    .version('0.0.1')
    .description('Transaction management system');

program
    .command('start')
    .alias('s')
    .description('Start script')
    .action(() => {
        prompt(questions.actions)
        .then(answer => methods[answer.action]())
        .then(() => {
            console.info('Process completed!');
            process.exit(1);
        });
    });

program.parse(process.argv);