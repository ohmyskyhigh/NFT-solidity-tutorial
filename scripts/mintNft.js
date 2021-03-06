require('dotenv').config('../.env');
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const API_URL = process.env.API_URL;
const web3 = createAlchemyWeb3(API_URL);


const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAbi = require('../artifacts/contracts/NFTContract.sol/NFTContract.json');
const contractAddress = "0xBb616Ed995499Dd0ddBD0bE153389091dc42d812";
const nftContract = new web3.eth.Contract(contractAbi.abi, contractAddress)


async function mintNFT(tokenUri) {

    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNft(tokenUri).encodeABI(),
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log("Promise failed:", err)
        })
}

mintNFT(
    "https://gateway.pinata.cloud/ipfs/QmRq4QYd1BReTjRQDnMBqdKLRa2CWWcAp1WN4dWFqdmryb"
)