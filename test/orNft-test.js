const { expect } = require("chai");
const { ethers } = require("hardhat")

describe("orNft Smart Contract Test", function() {

    let orNft;

    this.beforeEach(async function() {
         // This is executed before each test
         // deploying the smart contract
         const OrNft = await ethers.getContractFactory("orNft");
         orNft = await OrNft.deploy("Oscar NFT", "ORNFT");
    })

    it("NFT is minted successfully", async function() {

        [account1] = await ethers.getSigners();

        expect(await orNft.balanceOf(account1.address)).to.equal(0);

        const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
        const tx = await orNft.connect(account1).mint(tokenURI);

        expect(await orNft.balanceOf(account1.address)).to.equal(1);
        
    })

    it("tokenURI is set sucessfully", async function() {
        [account1, account2] = await ethers.getSigners();
    
        const tokenURI_1 = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
        const tokenURI_2 = "https://opensea-creatures-api.herokuapp.com/api/creature/2"
    
        const tx1 = await orNft.connect(account1).mint(tokenURI_1);
        const tx2 = await orNft.connect(account2).mint(tokenURI_2);
    
        expect(await orNft.tokenURI(0)).to.equal(tokenURI_1);
        expect(await orNft.tokenURI(1)).to.equal(tokenURI_2);
    
    })

})
