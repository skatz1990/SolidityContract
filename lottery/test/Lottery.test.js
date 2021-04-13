const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { abi, evm } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
    lottery = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: "0x" + evm.bytecode.object
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });
});

describe('Inbox', () => {
    it('Deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

//     it('Has a default message', async () => {
//         const message = await inbox.methods.message().call();
//         assert.strictEqual(message, "My message");
//     })

//     it('Can change the message', async () => {
//         await inbox.methods.setMessage('bye').send({ from: accounts[0] });
//         const message = await inbox.methods.message().call();
//         assert.strictEqual(message, 'bye');
//     })
// });