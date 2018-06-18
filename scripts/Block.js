const SHA256 = require('crypto-js/sha256');

class Block {
    /**
    * @param {Number} time - timestep
    * @param {Object} data.email - buyer email
    * @param {Object} data.product - product name
    * @returns {String} Status
    */
    constructor(data, time) {
        this.time = time? time : Date.now();
        this.data = data;

        this.previousHash = data.previousHash? data.previousHash : '0';
        this.index        = data.index? data.index : 0;
        this.nonce        = 0;

        this.hash = this.calculateHash();
    }

    mine(complexity) {
        
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.time + this.data + this.nonce).toString();
    }
}

module.exports = Block;