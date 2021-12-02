require('dotenv').config('../.env');
const hre = require("hardhat");

const PUBLIC_KEY = process.env.PUBLIC_KEY;

async function deploy() {
    const nftContract = await ethers.getContractFactory("NFTContract");
    const contract = await nftContract.deploy(PUBLIC_KEY);
    console.log("Contract deployed to address:", contract.address)
};

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })