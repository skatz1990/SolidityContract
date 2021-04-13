const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(abi, evm.bytecode, {
        from: accounts[0], gas: '1000000'
    });

    //inbox.methods.setMessage("My message");
});

describe('Inbox', () => {
    it('sets the message', () => {
        console.log(inbox.methods.getMessage().call());
        assert(inbox.methods.getMessage() === "My message");
    });
});