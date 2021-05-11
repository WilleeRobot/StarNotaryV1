// Importing the StartNotary Smart Contract ABI (JSON representation of the Smart Contract)
const StarNotary = artifacts.require("StarNotary");

let accounts; // List of development accounts provided by Truffle
let owner; // Global variable to use in the tests cases

// This calls the StarNotary Smart contract and initializes it
contract('StarNotary', (accs) => {
    accounts = accs; // Assigning test accounts
    owner = accounts[0]; // Assigning the owner test account
});

// Test #1 - Test if the contract is able to return the starName property that was initialized in the contract constructor
it('has correct name', async () => {
    let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance.
    let starName = await instance.starName.call(); // Calling the starName property
    assert.equal(starName, "Awesome Star"); // Assert if the starName property was initialized correctly
});

// Test #2 - test if the Smart Contract function claimStar assigns the Star to the owner address
it('can be claimed', async () => {
    let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance.
    await instance.claimStar({from: owner}); // Calling the Smart Contract function claimStar
    let starOwner = await instance.starOwner.call(); // Getting the owner address
    assert.equal(starOwner, owner); // Verifying if the owner address match with owner of the address
});

// Test #3 - test if the Smart Contract can have the owner changed after calling the claimStar function
it('can change owners', async () => {
    let instance = await StarNotary.deployed();
    let secondUser = accounts[1];
    await instance.claimStar({from: owner});
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner);
    await instance.claimStar({from: secondUser});
    let secondOwner = await instance.starOwner.call();
    assert.equal(secondOwner, secondUser);
 });

 // Test #4 - test if the name of the start can be changed when calling the changeName function
 it('can change the name of the star', async () => {
     let instance = await StarNotary.deployed();
     await instance.claimStar({from: owner});
     await instance.changeName('Oscar', {from: owner});
     assert.equal(await instance.starName.call(), 'Oscar');
 })