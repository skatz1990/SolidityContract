const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
const mnemonicPhrase = '';

let provider = new HDWalletProvider({
    mnemonic:{
        phrase: mnemonicPhrase
    },
    providerOrUrl: '',
    numberOfAddresses: 2,
    addressIndex: 1
});

const web3 = new Web3(provider);

const deploy = async () => {

    accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    try {
        const result = await new web3.eth.Contract(abi)
            .deploy({ data: "0x" + evm.bytecode.object })
            .send({ gas: 1000000, from: accounts[0] });

        console.log(abi);
        console.log('Contract deployed to', result.options.address);
    } catch (err) {
        console.log(err);
    }

};
deploy();