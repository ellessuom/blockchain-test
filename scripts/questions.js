const { Separator }  = require('inquirer');

/**
 * Main menu - action to excecute
 */
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
    },
    new Separator(),
    {
        name: 'Add product',
        value: 'addProduct'
    },
    {
        name: 'Get all products',
        value: 'getAllProducts'
    }],
    message: 'Select action:'
}];

/**
 * New transaction params
 */
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

/**
 * New product params
 */
const product_creation = [
    {
        type: 'input',
        name: 'name',
        message: 'Product name?'
    },
    {
        type: 'list',
        name: 'category',
        choices: [{
            name: 'Fruit',
            value: 'fruit'
        }, {
            name: 'Drink',
            value: 'drink'
        }]
    },
    {
        type: 'input',
        name: 'price',
        message: 'Product price?'
    }
];

/**
 * Transaction search - get transaction field
 */
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

/**
 * Transaction search - get field value
 */
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
    product_creation,
    query_field,
    query_field_value
};