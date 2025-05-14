# Hyperledger Fabric Project Setup Guide

This guide will help you set up and run the Hyperledger Fabric project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Docker Desktop**
   - Download and install from [Docker's official website](https://www.docker.com/products/docker-desktop)
   - Make sure Docker Desktop is running before proceeding with the setup

2. **Node.js and npm**
   - Install Node.js (v14 or later) from [Node.js official website](https://nodejs.org/)
   - npm will be installed automatically with Node.js

3. **Git**
   - Install Git from [Git's official website](https://git-scm.com/)

## Setup Steps

### 1. Create Project Directory
First, create a directory for your Fabric development:
```bash
mkdir ~/fabric-dev
cd ~/fabric-dev
```

### 2. Install Hyperledger Fabric
Run the following command to download and install Hyperledger Fabric:
```bash
curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/bootstrap.sh | bash -s
```

This script will:
- Download the necessary Hyperledger Fabric binaries
- Download the Fabric CA client
- Pull required Docker images
- Set up the basic network structure

### 3. Clone the Project Repository
```bash
git clone <repository-url>
cd dlt-case-hyperledger-febric
```

### 4. Start the Test Network
Navigate to the test network directory and start the network:
```bash
cd fabric-samples/test-network
./network.sh up
```

### 5. Create and Join Channel
```bash
./network.sh createChannel -c mychannel
```

### 6. Shutdown Channel
```bash
./network.sh down
```

### 7. Deploy Chaincode
```bash
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript
```

## Project Structure

- `fabric-samples/`: Contains the Hyperledger Fabric sample applications and test network
- `chaincode/`: Contains the smart contract code
- `application/`: Contains the client application code

## Common Issues and Solutions

1. **Docker Connection Error**
   - Error: "Cannot connect to the Docker daemon"
   - Solution: Make sure Docker Desktop is running

2. **Port Conflicts**
   - If you see port conflict errors, ensure no other services are using the required ports
   - Default ports: 7050, 7051, 7052, 7053, 7054

3. **Permission Issues**
   - If you encounter permission errors, try running commands with sudo (Linux/Mac) or as administrator (Windows)

4. **Installation Script Error**
   - If the installation script fails, ensure you have a stable internet connection
   - Try running the script again
   - Make sure you have sufficient disk space

## Additional Resources

- [Hyperledger Fabric Documentation](https://hyperledger-fabric.readthedocs.io/)
- [Fabric Samples Repository](https://github.com/hyperledger/fabric-samples)
- [Fabric SDK Documentation](https://hyperledger.github.io/fabric-sdk-node/)

## Support

If you encounter any issues or have questions, please:
1. Check the [Hyperledger Fabric documentation](https://hyperledger-fabric.readthedocs.io/)
2. Search for similar issues on [Stack Overflow](https://stackoverflow.com/questions/tagged/hyperledger-fabric)
3. Open an issue in this repository

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.