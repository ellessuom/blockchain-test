const actions = [{
    type: 'list',
    name: 'action',
    choices: [{
        name: 'Add transaction',
        value: 'add'
    }, {
        name: 'Get transaction',
        value: 'get'
    }, {
        name: 'Get all transactions',
        value: 'getAll'
    }],
    message: 'Select action:'
}];

const creation = [{
        type: 'input',
        name: 'email',
        message: 'buyer email?'
    },
    {
        type: 'input',
        name: 'product',
        message: 'product name?'
    }
];

const query_field = [{
    type: 'list',
    name: 'query',
    choices: [{
        name: 'Index',
        value: 'index'
    }, {
        name: 'Buyer email',
        value: 'data.email'
    }, {
        name: 'Product name',
        value: 'data.product'
    }],
    message: 'Which param would you like to use to search?'
}];

const query_field_value = {
    index: [{
        type: 'input',
        name: 'value',
        message: 'Index value?'
    }],
    'data.email': [{
        type: 'input',
        name: 'value',
        message: 'Buyer email?'
    }],
    'data.product': [{
        type: 'input',
        name: 'value',
        message: 'Product name?'
    }],
};

module.exports = {
    actions,
    creation,
    query_field,
    query_field_value
};