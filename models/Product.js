const Q = require('q');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/test');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['fruit', 'drink'],
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

const parseProducts = product => {
    return `Name: ${product.name}\nCategory: ${product.category}\nPrice: ${product.price}`;
};

const add = data => {
    const d = Q.defer();

    let product = new Product(data);
    Product.create(product, err => {
        if (err) {
            console.err('Error while trying to create a new transaction');
            return d.reject(err);
        }
        console.info('New product added!');
        d.resolve();
    });

    return d.promise;
};

const getAll = (query) => {
    const d = Q.defer();
    if (!query) {
        query = null;
    }
    console.info('Fetching products...');
    Product.find(query)
    .exec((err, products) => {
        if (err) {
            console.err('Error while trying to fetch transaction list');
            return d.reject(err);
        }
        if (!products.length) {
            console.info('No products found!');
            return d.resolve([]);
        }
        d.resolve(products.map(t => parseProducts(t)));
    });

    return d.promise;
};

module.exports = {
    add,
    getAll
};