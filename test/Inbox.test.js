const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { abi, evm } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: "0x" + evm.bytecode.object,
            arguments: ["My message"]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });
});

describe('Inbox', () => {
    it('Deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('Has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, "My message");
    })

    it('Can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'bye');
    })
});