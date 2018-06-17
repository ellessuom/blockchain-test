const actions = [
    {
      type   : 'list',
      name   : 'action',
      choices: [{
          name : 'Add transaction',
          value: 'add'
      }, {
        name : 'Get transaction',
        value: 'get'
      }, {
        name : 'Get all transactions',
        value: 'getAll'
      }],
      message: 'Select action:'
    }
];

const construction = [
    {
        type   : 'input',
        name   : 'email',
        message: 'buyer email?'
    },
    {
        type   : 'input',
        name   : 'product',
        message: 'product name?'
    }
];

const query = [];

module.exports = {
    actions,
    construction,
    query
};