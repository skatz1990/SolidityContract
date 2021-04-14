const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

var compiled = JSON.parse(solc.compile(JSON.stringify(input)));
for (var contractName in compiled.contracts["Lottery.sol"]) {
    module.exports = compiled.contracts["Lottery.sol"][contractName];
}

console.log(compiled);