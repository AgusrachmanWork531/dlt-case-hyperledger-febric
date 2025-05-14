'use strict'

// Mengimpor TanahContract dari file tanah.js yang berada di folder lib
const TanahContract = require('./lib/tanah')

// Mengekspor array contracts yang berisi TanahContract
// Array ini akan digunakan oleh Hyperledger Fabric untuk mendaftarkan smart contract
module.exports.contracts = [TanahContract]