/* eslint-disable no-undef */
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("ASM"); // Replace with name of your smart contract

  // Get the deployment transaction
  const deployTransaction = Token.getDeployTransaction();

  // Estimate gas for the deployment transaction
  const gasEstimate = await deployer.estimateGas(deployTransaction);

  // Fetch the current gas price
  const gasPrice = await ethers.provider.getGasPrice();

  // Calculate the estimated cost in ETH
  const costInWei = gasEstimate.mul(gasPrice);
  const costInEth = ethers.utils.formatEther(costInWei);

  console.log(`Estimated cost to deploy: ${costInEth} ETH`);

  const token = await Token.deploy({
    gasLimit: 5000000,
    gasPrice: gasPrice,
  });

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
