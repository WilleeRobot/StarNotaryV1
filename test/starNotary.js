// Importing the StartNotary Smart Contract ABI (JSON representation of the Smart Contract)
const StarNotary = artifacts.require("StarNotary");

let accounts; // List of development accounts provided by Truffle
let owner; // Global variable to use in the tests cases

// Initialize the StarNotary smart contract
// Contract keyword works like Mocha framework; contract does the beforeEach inherently.
// web3 instance is automatically created in the test file so functions can be called directly on the contract instance.
// 

contract("StarNotary", accs => {
    accounts = accs; // Assign the test accounts
    owner = accounts[0]; // Assign the owner test account
});

// Test #1: Test if the contract is able to return the starName property initialized in the contract constructor
it('has correct name', async () => {
    let instance = await StarNotary.deployed(); // Get the deployed smart contract
    let starName = await instance.starName.call(); // Call the starName property from the smart contract
    assert.equal(starName, "Awesome Star"); // Assert and run the test - should equal "Awesome Star" as defined in the constructor
});

// Test #2: Test if calling claimStar will update the owner of the smart contract to current address of user and persist the change
it('can change owners', async () => {
    let instance = await StarNotary.deployed();
    let secondUser = accounts[1];
    await instance.claimStar({from: owner});
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner);
    await instance.claimStar({from: secondUser})
    let secondOwner = await instance.starOwner.call();
    assert.equal(secondOwner, secondUser);
});

// Test #3: Test to see if the name of the star can be changed
it('can change the name of the star', async () => {
    let instance = await StarNotary.deployed();
    await instance.claimStar({from: owner});
    await instance.changeName('Oscar', {from: owner})
    assert.equal(await instance.starName.call(), 'Oscar');
})