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

const query_type = [
    {
      type   : 'list',
      name   : 'query',
      choices: [{
          name : 'Index',
          value: 'index'
      }, {
        name : 'Buyer email',
        value: 'email'
      }, {
        name : 'Product name',
        value: 'product'
      }],
      message: 'Which param would you like to use to search?'
    }
];

const query = {
    index: [{
        type   : 'input',
        name   : 'value',
        message: 'Index value?'
    }],
    email: [{
        type   : 'input',
        name   : 'value',
        message: 'Buyer email?'
    }],
    product: [{
        type   : 'input',
        name   : 'value',
        message: 'Product name?'
    }],
};

const query_value = [
    {
        type   : 'input',
        name   : 'email',
        message: 'buyer email?'
    }
];

module.exports = {
    actions,
    construction,
    query_type,
    query
};