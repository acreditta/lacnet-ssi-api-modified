import config from "../config.js";
import lacchain from "@lacchain/gas-model-provider";
import ethers from "ethers";

function getSigner() {
  if( config.network.nodeAddress ) {
    return new lacchain.GasModelSigner( config.account.privateKey, new lacchain.GasModelProvider( config.network.rpc ), config.network.nodeAddress, config.network.expiration );
  }
  return new ethers.Wallet( '0x' + config.account.privateKey, new ethers.providers.JsonRpcProvider( config.network.rpc ) )
}

export function getCustomSigner(privateKey) {
  if( config.network.nodeAddress ) {
    return new lacchain.GasModelSigner( privateKey, new lacchain.GasModelProvider( config.network.rpc ), config.network.nodeAddress, config.network.expiration );
  }
  return new ethers.Wallet( '0x' + privateKey, new ethers.providers.JsonRpcProvider( config.network.rpc ) )
}

export const signer = getSigner();

export const PKD_CONTRACT = {
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "entity",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "did",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expires",
          "type": "uint256"
        }
      ],
      "name": "PublicKeyAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "entity",
          "type": "address"
        }
      ],
      "name": "PublicKeyRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "entity",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "did",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expires",
          "type": "uint256"
        }
      ],
      "name": "PublicKeyUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "publicKeys",
      "outputs": [
        {
          "internalType": "string",
          "name": "did",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "expires",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "status",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_entity",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_did",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_expires",
          "type": "uint256"
        }
      ],
      "name": "register",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_entity",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_did",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_expires",
          "type": "uint256"
        }
      ],
      "name": "update",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_entity",
          "type": "address"
        }
      ],
      "name": "revoke",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "entity",
          "type": "address"
        }
      ],
      "name": "isActive",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6111db8061010d6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80639f8a13d71161005b5780639f8a13d7146100ed578063a3d6f9a91461011d578063f2fde38b1461014f578063fc0d1b841461016b57610088565b806359ffbaa81461008d578063715018a6146100a957806374a8f103146100b35780638da5cb5b146100cf575b600080fd5b6100a760048036038101906100a29190610b90565b610187565b005b6100b1610379565b005b6100cd60048036038101906100c89190610b67565b610401565b005b6100d761057c565b6040516100e49190610e5e565b60405180910390f35b61010760048036038101906101029190610b67565b6105a5565b6040516101149190610e79565b60405180910390f35b61013760048036038101906101329190610b67565b610603565b60405161014693929190610ec4565b60405180910390f35b61016960048036038101906101649190610b67565b6106c2565b005b61018560048036038101906101809190610b90565b6107ba565b005b61018f610966565b73ffffffffffffffffffffffffffffffffffffffff166101ad61057c565b73ffffffffffffffffffffffffffffffffffffffff1614610203576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101fa90610f82565b60405180910390fd5b6000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060018160020160009054906101000a900460ff1660ff161461029d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029490610f42565b60405180910390fd5b428160010154116102e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102da90610f62565b60405180910390fd5b828160000190805190602001906102fb929190610a32565b5081816001018190555060018160020160006101000a81548160ff021916908360ff1602179055508373ffffffffffffffffffffffffffffffffffffffff167fb6831f709d1929af6d50c116b74d3c6010fba8caa74ccb1d4f48709b6d921083848460405161036b929190610e94565b60405180910390a250505050565b610381610966565b73ffffffffffffffffffffffffffffffffffffffff1661039f61057c565b73ffffffffffffffffffffffffffffffffffffffff16146103f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ec90610f82565b60405180910390fd5b6103ff600061096e565b565b610409610966565b73ffffffffffffffffffffffffffffffffffffffff1661042761057c565b73ffffffffffffffffffffffffffffffffffffffff161461047d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047490610f82565b60405180910390fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060018160020160009054906101000a900460ff1660ff1614610517576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050e90610f22565b60405180910390fd5b60028160020160006101000a81548160ff021916908360ff1602179055508173ffffffffffffffffffffffffffffffffffffffff167f3e9b3945c326d5b02acb76accdb779cb4e642522f75894270be2881eda642d8760405160405180910390a25050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600060018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff1660ff16149050919050565b6001602052806000526040600020600091509050806000018054610626906110d6565b80601f0160208091040260200160405190810160405280929190818152602001828054610652906110d6565b801561069f5780601f106106745761010080835404028352916020019161069f565b820191906000526020600020905b81548152906001019060200180831161068257829003601f168201915b5050505050908060010154908060020160009054906101000a900460ff16905083565b6106ca610966565b73ffffffffffffffffffffffffffffffffffffffff166106e861057c565b73ffffffffffffffffffffffffffffffffffffffff161461073e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073590610f82565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156107ae576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107a590610f02565b60405180910390fd5b6107b78161096e565b50565b6107c2610966565b73ffffffffffffffffffffffffffffffffffffffff166107e061057c565b73ffffffffffffffffffffffffffffffffffffffff1614610836576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082d90610f82565b60405180910390fd5b6000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160020160009054906101000a900460ff1660ff16146108d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c790610fa2565b60405180910390fd5b828160000190805190602001906108e8929190610a32565b5081816001018190555060018160020160006101000a81548160ff021916908360ff1602179055508373ffffffffffffffffffffffffffffffffffffffff167f80b0c083380bb656e84ff85ecd252029832125c1685b9d8949ca84db37bf55488484604051610958929190610e94565b60405180910390a250505050565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054610a3e906110d6565b90600052602060002090601f016020900481019282610a605760008555610aa7565b82601f10610a7957805160ff1916838001178555610aa7565b82800160010185558215610aa7579182015b82811115610aa6578251825591602001919060010190610a8b565b5b509050610ab49190610ab8565b5090565b5b80821115610ad1576000816000905550600101610ab9565b5090565b6000610ae8610ae384610ff3565b610fc2565b905082815260208101848484011115610b0057600080fd5b610b0b848285611094565b509392505050565b600081359050610b2281611177565b92915050565b600082601f830112610b3957600080fd5b8135610b49848260208601610ad5565b91505092915050565b600081359050610b618161118e565b92915050565b600060208284031215610b7957600080fd5b6000610b8784828501610b13565b91505092915050565b600080600060608486031215610ba557600080fd5b6000610bb386828701610b13565b935050602084013567ffffffffffffffff811115610bd057600080fd5b610bdc86828701610b28565b9250506040610bed86828701610b52565b9150509250925092565b610c008161103f565b82525050565b610c0f81611051565b82525050565b6000610c2082611023565b610c2a818561102e565b9350610c3a8185602086016110a3565b610c4381611166565b840191505092915050565b6000610c5b60268361102e565b91507f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008301527f64647265737300000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000610cc160208361102e565b91507f546865207075626c6963206b6579206973206e6f7420726567697374657265646000830152602082019050919050565b6000610d0160348361102e565b91507f546865207075626c6963206b6579206973206e6f74207265676973746572656460008301527f206f7220686173206265656e207265766f6b65640000000000000000000000006020830152604082019050919050565b6000610d67601a8361102e565b91507f546865207075626c6963206b65792068617320657870697265640000000000006000830152602082019050919050565b6000610da760208361102e565b91507f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726000830152602082019050919050565b6000610de760248361102e565b91507f546865207075626c6963206b657920697320616c72656164792072656769737460008301527f65726564000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b610e498161107d565b82525050565b610e5881611087565b82525050565b6000602082019050610e736000830184610bf7565b92915050565b6000602082019050610e8e6000830184610c06565b92915050565b60006040820190508181036000830152610eae8185610c15565b9050610ebd6020830184610e40565b9392505050565b60006060820190508181036000830152610ede8186610c15565b9050610eed6020830185610e40565b610efa6040830184610e4f565b949350505050565b60006020820190508181036000830152610f1b81610c4e565b9050919050565b60006020820190508181036000830152610f3b81610cb4565b9050919050565b60006020820190508181036000830152610f5b81610cf4565b9050919050565b60006020820190508181036000830152610f7b81610d5a565b9050919050565b60006020820190508181036000830152610f9b81610d9a565b9050919050565b60006020820190508181036000830152610fbb81610dda565b9050919050565b6000604051905081810181811067ffffffffffffffff82111715610fe957610fe8611137565b5b8060405250919050565b600067ffffffffffffffff82111561100e5761100d611137565b5b601f19601f8301169050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600061104a8261105d565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b838110156110c15780820151818401526020810190506110a6565b838111156110d0576000848401525b50505050565b600060028204905060018216806110ee57607f821691505b6020821081141561110257611101611108565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6111808161103f565b811461118b57600080fd5b50565b6111978161107d565b81146111a257600080fd5b5056fea2646970667358221220f2e58b600ea67d7863c10914c71b96e86b6e8e77ec8d65ee2fb1fd69d649da9f64736f6c63430008000033"
}

export const TL_CONTRACT = {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_parent",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "entity",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "did",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expires",
          "type": "uint256"
        }
      ],
      "name": "EntityAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "entity",
          "type": "address"
        }
      ],
      "name": "EntityRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "entity",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "did",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expires",
          "type": "uint256"
        }
      ],
      "name": "EntityUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "entities",
      "outputs": [
        {
          "internalType": "string",
          "name": "did",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "expires",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "status",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "parent",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_entity",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_did",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_expires",
          "type": "uint256"
        }
      ],
      "name": "register",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_entity",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_did",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_expires",
          "type": "uint256"
        }
      ],
      "name": "update",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_entity",
          "type": "address"
        }
      ],
      "name": "revoke",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040523480156200001157600080fd5b506040516200179b3803806200179b8339818101604052810190620000379190620002be565b620000576200004b620000b960201b60201c565b620000c160201b60201c565b81600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060019080519060200190620000b092919062000185565b50505062000497565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8280546200019390620003e9565b90600052602060002090601f016020900481019282620001b7576000855562000203565b82601f10620001d257805160ff191683800117855562000203565b8280016001018555821562000203579182015b8281111562000202578251825591602001919060010190620001e5565b5b50905062000212919062000216565b5090565b5b808211156200023157600081600090555060010162000217565b5090565b60006200024c62000246846200034c565b62000318565b9050828152602081018484840111156200026557600080fd5b62000272848285620003b3565b509392505050565b6000815190506200028b816200047d565b92915050565b600082601f830112620002a357600080fd5b8151620002b584826020860162000235565b91505092915050565b60008060408385031215620002d257600080fd5b6000620002e2858286016200027a565b925050602083015167ffffffffffffffff8111156200030057600080fd5b6200030e8582860162000291565b9150509250929050565b6000604051905081810181811067ffffffffffffffff821117156200034257620003416200044e565b5b8060405250919050565b600067ffffffffffffffff8211156200036a57620003696200044e565b5b601f19601f8301169050602081019050919050565b60006200038c8262000393565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b83811015620003d3578082015181840152602081019050620003b6565b83811115620003e3576000848401525b50505050565b600060028204905060018216806200040257607f821691505b602082108114156200041957620004186200041f565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000488816200037f565b81146200049457600080fd5b50565b6112f480620004a76000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063715018a611610066578063715018a61461012357806374a8f1031461012d5780638792ffef146101495780638da5cb5b14610165578063f2fde38b1461018357610093565b806306fdde031461009857806315b8ac24146100b65780631d8ee48a146100d257806360f96a8f14610105575b600080fd5b6100a061019f565b6040516100ad9190610f82565b60405180910390f35b6100d060048036038101906100cb9190610ca2565b61022d565b005b6100ec60048036038101906100e79190610c79565b61041b565b6040516100fc9493929190610fa4565b60405180910390f35b61010d610568565b60405161011a9190610f67565b60405180910390f35b61012b61058e565b005b61014760048036038101906101429190610c79565b610616565b005b610163600480360381019061015e9190610ca2565b610791565b005b61016d610957565b60405161017a9190610f67565b60405180910390f35b61019d60048036038101906101989190610c79565b610980565b005b600180546101ac906111ef565b80601f01602080910402602001604051908101604052809291908181526020018280546101d8906111ef565b80156102255780601f106101fa57610100808354040283529160200191610225565b820191906000526020600020905b81548152906001019060200180831161020857829003601f168201915b505050505081565b610235610a78565b73ffffffffffffffffffffffffffffffffffffffff16610253610957565b73ffffffffffffffffffffffffffffffffffffffff16146102a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a0906110a7565b60405180910390fd5b6000600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060018160030160009054906101000a900460ff1660ff1614610343576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033a90611067565b60405180910390fd5b42816002015411610389576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038090611047565b60405180910390fd5b818160020181905550838160000190805190602001906103aa929190610b44565b50828160010190805190602001906103c3929190610b44565b508473ffffffffffffffffffffffffffffffffffffffff167fb5379e5f799febcc201195f35f6064be85eb62d2e4c222911dcc2a4821b8e3cc858460405161040c929190610ff7565b60405180910390a25050505050565b600360205280600052604060002060009150905080600001805461043e906111ef565b80601f016020809104026020016040519081016040528092919081815260200182805461046a906111ef565b80156104b75780601f1061048c576101008083540402835291602001916104b7565b820191906000526020600020905b81548152906001019060200180831161049a57829003601f168201915b5050505050908060010180546104cc906111ef565b80601f01602080910402602001604051908101604052809291908181526020018280546104f8906111ef565b80156105455780601f1061051a57610100808354040283529160200191610545565b820191906000526020600020905b81548152906001019060200180831161052857829003601f168201915b5050505050908060020154908060030160009054906101000a900460ff16905084565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610596610a78565b73ffffffffffffffffffffffffffffffffffffffff166105b4610957565b73ffffffffffffffffffffffffffffffffffffffff161461060a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610601906110a7565b60405180910390fd5b6106146000610a80565b565b61061e610a78565b73ffffffffffffffffffffffffffffffffffffffff1661063c610957565b73ffffffffffffffffffffffffffffffffffffffff1614610692576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610689906110a7565b60405180910390fd5b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060018160030160009054906101000a900460ff1660ff161461072c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610723906110c7565b60405180910390fd5b60028160030160006101000a81548160ff021916908360ff1602179055508173ffffffffffffffffffffffffffffffffffffffff167f8690b3b66f3b2d8fb674d4b36f56d3c68fcbd17f32f16fb1adb6e54946662ffd60405160405180910390a25050565b610799610a78565b73ffffffffffffffffffffffffffffffffffffffff166107b7610957565b73ffffffffffffffffffffffffffffffffffffffff161461080d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610804906110a7565b60405180910390fd5b6000600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160030160009054906101000a900460ff1660ff16146108a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161089e90611087565b60405180910390fd5b60018160030160006101000a81548160ff021916908360ff160217905550818160020181905550838160000190805190602001906108e6929190610b44565b50828160010190805190602001906108ff929190610b44565b508473ffffffffffffffffffffffffffffffffffffffff167f78d6452f6578b4aee0ff58b25f8d7330411580f04029bc6ee0d7a2e0c30a32f28584604051610948929190610ff7565b60405180910390a25050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610988610a78565b73ffffffffffffffffffffffffffffffffffffffff166109a6610957565b73ffffffffffffffffffffffffffffffffffffffff16146109fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f3906110a7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610a6c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6390611027565b60405180910390fd5b610a7581610a80565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054610b50906111ef565b90600052602060002090601f016020900481019282610b725760008555610bb9565b82601f10610b8b57805160ff1916838001178555610bb9565b82800160010185558215610bb9579182015b82811115610bb8578251825591602001919060010190610b9d565b5b509050610bc69190610bca565b5090565b5b80821115610be3576000816000905550600101610bcb565b5090565b6000610bfa610bf584611118565b6110e7565b905082815260208101848484011115610c1257600080fd5b610c1d8482856111ad565b509392505050565b600081359050610c3481611290565b92915050565b600082601f830112610c4b57600080fd5b8135610c5b848260208601610be7565b91505092915050565b600081359050610c73816112a7565b92915050565b600060208284031215610c8b57600080fd5b6000610c9984828501610c25565b91505092915050565b60008060008060808587031215610cb857600080fd5b6000610cc687828801610c25565b945050602085013567ffffffffffffffff811115610ce357600080fd5b610cef87828801610c3a565b935050604085013567ffffffffffffffff811115610d0c57600080fd5b610d1887828801610c3a565b9250506060610d2987828801610c64565b91505092959194509250565b610d3e81611164565b82525050565b6000610d4f82611148565b610d598185611153565b9350610d698185602086016111bc565b610d728161127f565b840191505092915050565b6000610d8a602683611153565b91507f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008301527f64647265737300000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000610df0601683611153565b91507f54686520656e74697479206861732065787069726564000000000000000000006000830152602082019050919050565b6000610e30603083611153565b91507f54686520656e74697479206973206e6f742072656769737465726564206f722060008301527f686173206265656e207265766f6b6564000000000000000000000000000000006020830152604082019050919050565b6000610e96602083611153565b91507f54686520656e7469747920697320616c726561647920726567697374657265646000830152602082019050919050565b6000610ed6602083611153565b91507f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726000830152602082019050919050565b6000610f16601c83611153565b91507f54686520656e74697479206973206e6f742072656769737465726564000000006000830152602082019050919050565b610f5281611196565b82525050565b610f61816111a0565b82525050565b6000602082019050610f7c6000830184610d35565b92915050565b60006020820190508181036000830152610f9c8184610d44565b905092915050565b60006080820190508181036000830152610fbe8187610d44565b90508181036020830152610fd28186610d44565b9050610fe16040830185610f49565b610fee6060830184610f58565b95945050505050565b600060408201905081810360008301526110118185610d44565b90506110206020830184610f49565b9392505050565b6000602082019050818103600083015261104081610d7d565b9050919050565b6000602082019050818103600083015261106081610de3565b9050919050565b6000602082019050818103600083015261108081610e23565b9050919050565b600060208201905081810360008301526110a081610e89565b9050919050565b600060208201905081810360008301526110c081610ec9565b9050919050565b600060208201905081810360008301526110e081610f09565b9050919050565b6000604051905081810181811067ffffffffffffffff8211171561110e5761110d611250565b5b8060405250919050565b600067ffffffffffffffff82111561113357611132611250565b5b601f19601f8301169050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600061116f82611176565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b838110156111da5780820151818401526020810190506111bf565b838111156111e9576000848401525b50505050565b6000600282049050600182168061120757607f821691505b6020821081141561121b5761121a611221565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b61129981611164565b81146112a457600080fd5b50565b6112b081611196565b81146112bb57600080fd5b5056fea2646970667358221220bd01d0d9c4f5a2e322c451cbbcb9af0168a720a0254a2f3eac73090985e46ec564736f6c63430008000033"
}

export const CLAIMS_VERIFIER = {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_registryAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ISSUER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "SIGNER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getRoleMember",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleMemberCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "registry",
      "outputs": [
        {
          "internalType": "contract CredentialRegistry",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "issuer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "subject",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "data",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "validFrom",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "validTo",
              "type": "uint256"
            }
          ],
          "internalType": "struct ClaimTypes.VerifiableCredential",
          "name": "vc",
          "type": "tuple"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "verifyCredential",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "issuer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "subject",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "data",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "validFrom",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "validTo",
              "type": "uint256"
            }
          ],
          "internalType": "struct ClaimTypes.VerifiableCredential",
          "name": "vc",
          "type": "tuple"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "verifySigner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_subject",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "_credentialHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_from",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_exp",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "registerCredential",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_credentialHash",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "registerSignature",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040523480156200001157600080fd5b5060405162002a1738038062002a1783398181016040528101906200003791906200037d565b6040518060400160405280600c81526020017f454950373132446f6d61696e00000000000000000000000000000000000000008152506040518060400160405280600181526020017f31000000000000000000000000000000000000000000000000000000000000008152506209e5513084620000f060405180608001604052808781526020018681526020018581526020018473ffffffffffffffffffffffffffffffffffffffff168152506200015760201b60201c565b600181905550806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505050620001506000801b33620001cf60201b60201c565b506200049b565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f82600001518051906020012083602001518051906020012084604001518560600151604051602001620001b2959493929190620003dc565b604051602081830303815290604052805190602001209050919050565b620001e18282620001e560201b60201c565b5050565b6200021481600260008581526020019081526020016000206000016200028960201b62000a5f1790919060201c565b1562000285576200022a620002c160201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6000620002b9836000018373ffffffffffffffffffffffffffffffffffffffff1660001b620002c960201b60201c565b905092915050565b600033905090565b6000620002dd83836200034360201b60201c565b620003385782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190506200033d565b600090505b92915050565b600080836001016000848152602001908152602001600020541415905092915050565b600081519050620003778162000481565b92915050565b6000602082840312156200039057600080fd5b6000620003a08482850162000366565b91505092915050565b620003b48162000439565b82525050565b620003c5816200044d565b82525050565b620003d68162000477565b82525050565b600060a082019050620003f36000830188620003ba565b620004026020830187620003ba565b620004116040830186620003ba565b620004206060830185620003cb565b6200042f6080830184620003a9565b9695505050505050565b6000620004468262000457565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6200048c8162000439565b81146200049857600080fd5b50565b61256c80620004ab6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806386e8272411610097578063a1ebf35d11610066578063a1ebf35d146102c2578063a217fddf146102e0578063ca15c873146102fe578063d547741f1461032e576100f5565b806386e82724146102025780639010d07c146102325780639137ebec1461026257806391d1485414610292576100f5565b806336568abe116100d357806336568abe1461017a578063448684ac146101965780637b103999146101c657806382aefa24146101e4576100f5565b80630d60c469146100fa578063248a9ca31461012e5780632f2ff15d1461015e575b600080fd5b610114600480360381019061010f9190611996565b61034a565b60405161012595949392919061202d565b60405180910390f35b61014860048036038101906101439190611831565b610418565b6040516101559190612080565b60405180910390f35b6101786004803603810190610173919061185a565b610438565b005b610194600480360381019061018f919061185a565b6104ac565b005b6101b060048036038101906101ab9190611896565b61052f565b6040516101bd9190612012565b60405180910390f35b6101ce61067a565b6040516101db91906121e8565b60405180910390f35b6101ec61069e565b6040516101f99190612080565b60405180910390f35b61021c6004803603810190610217919061193e565b6106c2565b6040516102299190612012565b60405180910390f35b61024c60048036038101906102479190611902565b6107e5565b6040516102599190611f3b565b60405180910390f35b61027c60048036038101906102779190611776565b610817565b6040516102899190612012565b60405180910390f35b6102ac60048036038101906102a7919061185a565b610967565b6040516102b99190612012565b60405180910390f35b6102ca610999565b6040516102d79190612080565b60405180910390f35b6102e86109bd565b6040516102f59190612080565b60405180910390f35b61031860048036038101906103139190611831565b6109c4565b6040516103259190612363565b60405180910390f35b6103486004803603810190610343919061185a565b6109eb565b005b60008060008060008060015461035f8b610a8f565b604051602001610370929190611f04565b604051602081830303815290604052805190602001209050610396818b60000151610afd565b6103a4828c60000151610bb3565b6103b5838d600001518d8d8d610c69565b6103de7fe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f706109c4565b6103ec858f60000151610d70565b60ff16146104028e606001518f60800151610e26565b9550955095509550955050945094509450945094565b600060026000838152602001908152602001600020600201549050919050565b61045f600260008481526020019081526020016000206002015461045a610e3f565b610967565b61049e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049590612263565b60405180910390fd5b6104a88282610e47565b5050565b6104b4610e3f565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610521576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051890612343565b60405180910390fd5b61052b8282610edb565b5050565b600061055b7fe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f7033610967565b61059a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610591906122e3565b60405180910390fd5b60006105f384848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505087610f6f90919063ffffffff16565b90508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610663576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065a90612323565b60405180910390fd5b61066f86868686611160565b915050949350505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b7f114e74f6ea3bd819998f78687bfcb11b140da08e9b7d222fa9c1f1ba1f2aa12281565b6000806001546106d186610a8f565b6040516020016106e2929190611f04565b604051602081830303815290604052805190602001209050600061075385858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505083610f6f90919063ffffffff16565b905061077f7fe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f7082610967565b80156107da57506107d982876000015187878080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061121e565b5b925050509392505050565b600061080f82600260008681526020019081526020016000206000016112d790919063ffffffff16565b905092915050565b60006108437f114e74f6ea3bd819998f78687bfcb11b140da08e9b7d222fa9c1f1ba1f2aa12233610967565b610882576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087990612243565b60405180910390fd5b60006108db84848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505088610f6f90919063ffffffff16565b90508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461094b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094290612323565b60405180910390fd5b61095a338989898989896112f1565b9150509695505050505050565b600061099182600260008681526020019081526020016000206000016113b890919063ffffffff16565b905092915050565b7fe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f7081565b6000801b81565b60006109e4600260008481526020019081526020016000206000016113e8565b9050919050565b610a126002600084815260200190815260200160002060020154610a0d610e3f565b610967565b610a51576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a48906122c3565b60405180910390fd5b610a5b8282610edb565b5050565b6000610a87836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6113fd565b905092915050565b60007f057aaf322c79d4b390549d58e7c9e54049c8146bdb31538929442a557873670282600001518360200151846040015185606001518660800151604051602001610ae0969594939291906120c4565b604051602081830303815290604052805190602001209050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663957839d984846040518363ffffffff1660e01b8152600401610b5b92919061209b565b60206040518083038186803b158015610b7357600080fd5b505afa158015610b87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bab9190611808565b905092915050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d6d76ed583856040518363ffffffff1660e01b8152600401610c11929190611fe9565b60206040518083038186803b158015610c2957600080fd5b505afa158015610c3d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c619190611808565b905092915050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166387cf356e8660018988888860405160008152602001604052604051610ccc94939291906121a3565b6020604051602081039080840390855afa158015610cee573d6000803e3d6000fd5b505050602060405103516040518363ffffffff1660e01b8152600401610d15929190611f56565b60206040518083038186803b158015610d2d57600080fd5b505afa158015610d41573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d659190611808565b905095945050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166306b15df484846040518363ffffffff1660e01b8152600401610dce92919061209b565b60206040518083038186803b158015610de657600080fd5b505afa158015610dfa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1e91906119fa565b905092915050565b6000428311158015610e3757508142105b905092915050565b600033905090565b610e6f8160026000858152602001908152602001600020600001610a5f90919063ffffffff16565b15610ed757610e7c610e3f565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b610f03816002600085815260200190815260200160002060000161146d90919063ffffffff16565b15610f6b57610f10610e3f565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b60006041825114610fb5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fac90612283565b60405180910390fd5b60008060006020850151925060408501519150606085015160001a90507f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08260001c1115611038576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161102f906122a3565b60405180910390fd5b601b8160ff16141580156110505750601c8160ff1614155b15611090576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161108790612303565b60405180910390fd5b6000600187838686604051600081526020016040526040516110b594939291906121a3565b6020604051602081039080840390855afa1580156110d7573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611153576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161114a90612203565b60405180910390fd5b8094505050505092915050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663448684ac868686866040518563ffffffff1660e01b81526004016111c29493929190612125565b602060405180830381600087803b1580156111dc57600080fd5b505af11580156111f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112149190611808565b9050949350505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663701ee4638585856040518463ffffffff1660e01b815260040161127e93929190612165565b60206040518083038186803b15801561129657600080fd5b505afa1580156112aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ce9190611808565b90509392505050565b60006112e6836000018361149d565b60001c905092915050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166375130747898989898989896040518863ffffffff1660e01b81526004016113599796959493929190611f7f565b602060405180830381600087803b15801561137357600080fd5b505af1158015611387573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113ab9190611808565b9050979650505050505050565b60006113e0836000018373ffffffffffffffffffffffffffffffffffffffff1660001b61150a565b905092915050565b60006113f68260000161152d565b9050919050565b6000611409838361150a565b611462578260000182908060018154018082558091505060019003906000526020600020016000909190919091505582600001805490508360010160008481526020019081526020016000208190555060019050611467565b600090505b92915050565b6000611495836000018373ffffffffffffffffffffffffffffffffffffffff1660001b61153e565b905092915050565b6000818360000180549050116114e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114df90612223565b60405180910390fd5b8260000182815481106114f757fe5b9060005260206000200154905092915050565b600080836001016000848152602001908152602001600020541415905092915050565b600081600001805490509050919050565b6000808360010160008481526020019081526020016000205490506000811461161a576000600182039050600060018660000180549050039050600086600001828154811061158957fe5b90600052602060002001549050808760000184815481106115a657fe5b90600052602060002001819055506001830187600101600083815260200190815260200160002081905550866000018054806115de57fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050611620565b60009150505b92915050565b600081359050611635816124c3565b92915050565b60008151905061164a816124da565b92915050565b60008135905061165f816124f1565b92915050565b60008083601f84011261167757600080fd5b8235905067ffffffffffffffff81111561169057600080fd5b6020830191508360018202830111156116a857600080fd5b9250929050565b600060a082840312156116c157600080fd5b6116cb60a061237e565b905060006116db84828501611626565b60008301525060206116ef84828501611626565b602083015250604061170384828501611650565b604083015250606061171784828501611737565b606083015250608061172b84828501611737565b60808301525092915050565b60008135905061174681612508565b92915050565b60008135905061175b8161251f565b92915050565b6000815190506117708161251f565b92915050565b60008060008060008060a0878903121561178f57600080fd5b600061179d89828a01611626565b96505060206117ae89828a01611650565b95505060406117bf89828a01611737565b94505060606117d089828a01611737565b935050608087013567ffffffffffffffff8111156117ed57600080fd5b6117f989828a01611665565b92509250509295509295509295565b60006020828403121561181a57600080fd5b60006118288482850161163b565b91505092915050565b60006020828403121561184357600080fd5b600061185184828501611650565b91505092915050565b6000806040838503121561186d57600080fd5b600061187b85828601611650565b925050602061188c85828601611626565b9150509250929050565b600080600080606085870312156118ac57600080fd5b60006118ba87828801611650565b94505060206118cb87828801611626565b935050604085013567ffffffffffffffff8111156118e857600080fd5b6118f487828801611665565b925092505092959194509250565b6000806040838503121561191557600080fd5b600061192385828601611650565b925050602061193485828601611737565b9150509250929050565b600080600060c0848603121561195357600080fd5b6000611961868287016116af565b93505060a084013567ffffffffffffffff81111561197e57600080fd5b61198a86828701611665565b92509250509250925092565b60008060008061010085870312156119ad57600080fd5b60006119bb878288016116af565b94505060a06119cc8782880161174c565b93505060c06119dd87828801611650565b92505060e06119ee87828801611650565b91505092959194509250565b600060208284031215611a0c57600080fd5b6000611a1a84828501611761565b91505092915050565b611a2c816123e3565b82525050565b611a3b816123f5565b82525050565b611a4a81612401565b82525050565b611a61611a5c82612401565b6124a8565b82525050565b6000611a7383856123b6565b9350611a80838584612466565b611a89836124b2565b840190509392505050565b6000611a9f826123ab565b611aa981856123b6565b9350611ab9818560208601612475565b611ac2816124b2565b840191505092915050565b611ad681612442565b82525050565b6000611ae96018836123c7565b91507f45434453413a20696e76616c6964207369676e617475726500000000000000006000830152602082019050919050565b6000611b296022836123c7565b91507f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e60008301527f64730000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611b8f6018836123c7565b91507f43616c6c6572206973206e6f74206120697373756572203100000000000000006000830152602082019050919050565b6000611bcf602f836123c7565b91507f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60008301527f2061646d696e20746f206772616e7400000000000000000000000000000000006020830152604082019050919050565b6000611c35601f836123c7565b91507f45434453413a20696e76616c6964207369676e6174757265206c656e677468006000830152602082019050919050565b6000611c756002836123d8565b91507f19010000000000000000000000000000000000000000000000000000000000006000830152600282019050919050565b6000611cb56022836123c7565b91507f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008301527f75650000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611d1b6030836123c7565b91507f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60008301527f2061646d696e20746f207265766f6b65000000000000000000000000000000006020830152604082019050919050565b6000611d816016836123c7565b91507f43616c6c6572206973206e6f742061207369676e6572000000000000000000006000830152602082019050919050565b6000611dc16022836123c7565b91507f45434453413a20696e76616c6964207369676e6174757265202776272076616c60008301527f75650000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611e276023836123c7565b91507f53656e646572206861736e2774207369676e6564207468652063726564656e7460008301527f69616c00000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611e8d602f836123c7565b91507f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008301527f20726f6c657320666f722073656c6600000000000000000000000000000000006020830152604082019050919050565b611eef8161242b565b82525050565b611efe81612435565b82525050565b6000611f0f82611c68565b9150611f1b8285611a50565b602082019150611f2b8284611a50565b6020820191508190509392505050565b6000602082019050611f506000830184611a23565b92915050565b6000604082019050611f6b6000830185611a23565b611f786020830184611a23565b9392505050565b600060c082019050611f94600083018a611a23565b611fa16020830189611a23565b611fae6040830188611a41565b611fbb6060830187611ee6565b611fc86080830186611ee6565b81810360a0830152611fdb818486611a67565b905098975050505050505050565b6000604082019050611ffe6000830185611a23565b61200b6020830184611a41565b9392505050565b60006020820190506120276000830184611a32565b92915050565b600060a0820190506120426000830188611a32565b61204f6020830187611a32565b61205c6040830186611a32565b6120696060830185611a32565b6120766080830184611a32565b9695505050505050565b60006020820190506120956000830184611a41565b92915050565b60006040820190506120b06000830185611a41565b6120bd6020830184611a23565b9392505050565b600060c0820190506120d96000830189611a41565b6120e66020830188611a23565b6120f36040830187611a23565b6121006060830186611a41565b61210d6080830185611ee6565b61211a60a0830184611ee6565b979650505050505050565b600060608201905061213a6000830187611a41565b6121476020830186611a23565b818103604083015261215a818486611a67565b905095945050505050565b600060608201905061217a6000830186611a41565b6121876020830185611a23565b81810360408301526121998184611a94565b9050949350505050565b60006080820190506121b86000830187611a41565b6121c56020830186611ef5565b6121d26040830185611a41565b6121df6060830184611a41565b95945050505050565b60006020820190506121fd6000830184611acd565b92915050565b6000602082019050818103600083015261221c81611adc565b9050919050565b6000602082019050818103600083015261223c81611b1c565b9050919050565b6000602082019050818103600083015261225c81611b82565b9050919050565b6000602082019050818103600083015261227c81611bc2565b9050919050565b6000602082019050818103600083015261229c81611c28565b9050919050565b600060208201905081810360008301526122bc81611ca8565b9050919050565b600060208201905081810360008301526122dc81611d0e565b9050919050565b600060208201905081810360008301526122fc81611d74565b9050919050565b6000602082019050818103600083015261231c81611db4565b9050919050565b6000602082019050818103600083015261233c81611e1a565b9050919050565b6000602082019050818103600083015261235c81611e80565b9050919050565b60006020820190506123786000830184611ee6565b92915050565b6000604051905081810181811067ffffffffffffffff821117156123a157600080fd5b8060405250919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b60006123ee8261240b565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b600061244d82612454565b9050919050565b600061245f8261240b565b9050919050565b82818337600083830152505050565b60005b83811015612493578082015181840152602081019050612478565b838111156124a2576000848401525b50505050565b6000819050919050565b6000601f19601f8301169050919050565b6124cc816123e3565b81146124d757600080fd5b50565b6124e3816123f5565b81146124ee57600080fd5b50565b6124fa81612401565b811461250557600080fd5b50565b6125118161242b565b811461251c57600080fd5b50565b61252881612435565b811461253357600080fd5b5056fea264697066735822122047dcf3d834440ca7c9c0e2f9e62f12a2eccbeb8e3f924feb6cf621b0ea1fb89564736f6c634300060c0033"
}

export const CREDENTIAL_REGISTRY = {
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "credentialHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "by",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "id",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "iat",
          "type": "uint256"
        }
      ],
      "name": "CredentialRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "credentialHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "by",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "date",
          "type": "uint256"
        }
      ],
      "name": "CredentialRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "exits",
          "type": "bool"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "s",
              "type": "bytes32"
            },
            {
              "internalType": "uint8",
              "name": "v",
              "type": "uint8"
            }
          ],
          "indexed": false,
          "internalType": "struct ICredentialRegistry.Signature",
          "name": "signature",
          "type": "tuple"
        }
      ],
      "name": "SignatureRegistered",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ISSUER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "credentials",
      "outputs": [
        {
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "subject",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "validFrom",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "validTo",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "status",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getRoleMember",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleMemberCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_subject",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "_credentialHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_from",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_exp",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "registerCredential",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_credentialHash",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "registerSignature",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_credentialHash",
          "type": "bytes32"
        }
      ],
      "name": "revokeCredential",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_credentialHash",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        }
      ],
      "name": "exist",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exist",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "_credentialHash",
          "type": "bytes32"
        }
      ],
      "name": "status",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "signer",
          "type": "address"
        }
      ],
      "name": "verifyIssuer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "isValid",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_credentialHash",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "_issuer",
          "type": "address"
        }
      ],
      "name": "getSigners",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "signers",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_credentialHash",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "_issuer",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "isSigner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "digest",
          "type": "bytes32"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "getIssuer",
      "outputs": [
        {
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040523480156200001157600080fd5b50620000276000801b336200002d60201b60201c565b620001c3565b6200003f82826200004360201b60201c565b5050565b6200007181600080858152602001908152602001600020600001620000e660201b620017ee1790919060201c565b15620000e257620000876200011e60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600062000116836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6200012660201b60201c565b905092915050565b600033905090565b60006200013a8383620001a060201b60201c565b620001955782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190506200019a565b600090505b92915050565b600080836001016000848152602001908152602001600020541415905092915050565b612c8b80620001d36000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80639010d07c116100ad578063ca15c87311610071578063ca15c8731461037a578063ca6eec78146103aa578063d547741f146103da578063d6d76ed5146103f6578063f078e5db1461042657610121565b80639010d07c1461029c5780639052944e146102cc57806391d14854146102fc578063957839d91461032c578063a217fddf1461035c57610121565b8063448684ac116100f4578063448684ac146101be578063701ee463146101ee578063751307471461021e57806382aefa241461024e57806387cf356e1461026c57610121565b806306b15df414610126578063248a9ca3146101565780632f2ff15d1461018657806336568abe146101a2575b600080fd5b610140600480360381019061013b91906122d5565b61045a565b60405161014d9190612ad0565b60405180910390f35b610170600480360381019061016b91906122ac565b61067e565b60405161017d9190612935565b60405180910390f35b6101a0600480360381019061019b91906122d5565b61069d565b005b6101bc60048036038101906101b791906122d5565b610710565b005b6101d860048036038101906101d39190612311565b610793565b6040516101e5919061291a565b60405180910390f35b6102086004803603810190610203919061237d565b6107ab565b604051610215919061291a565b60405180910390f35b610238600480360381019061023391906121c9565b610ace565b604051610245919061291a565b60405180910390f35b610256610e9f565b6040516102639190612935565b60405180910390f35b6102866004803603810190610281919061218d565b610ec3565b604051610293919061291a565b60405180910390f35b6102b660048036038101906102b191906123e4565b610efc565b6040516102c39190612815565b60405180910390f35b6102e660048036038101906102e19190612420565b610f2d565b6040516102f39190612815565b60405180910390f35b610316600480360381019061031191906122d5565b610f88565b604051610323919061291a565b60405180910390f35b610346600480360381019061034191906122d5565b610fb9565b604051610353919061291a565b60405180910390f35b6103646111c9565b6040516103719190612935565b60405180910390f35b610394600480360381019061038f91906122ac565b6111d0565b6040516103a19190612ab5565b60405180910390f35b6103c460048036038101906103bf91906122ac565b6111f6565b6040516103d1919061291a565b60405180910390f35b6103f460048036038101906103ef91906122d5565b61150b565b005b610410600480360381019061040b9190612270565b61157e565b60405161041d919061291a565b60405180910390f35b610440600480360381019061043b91906122d5565b61175e565b604051610451959493929190612890565b60405180910390f35b6000610464611f38565b6001600085815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201805480602002602001604051908101604052809291908181526020016000905b82821015610607578382906000526020600020906003020160405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff1660ff1660ff1681525050815260200190600101906105a4565b5050505081526020016005820160009054906101000a900460ff1615151515815250509050600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff161461067257806080015151915050610678565b60009150505b92915050565b6000806000838152602001908152602001600020600201549050919050565b6106c3600080848152602001908152602001600020600201546106be61181e565b610f88565b610702576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f9906129b5565b60405180910390fd5b61070c8282611826565b5050565b61071861181e565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610785576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077c90612a95565b60405180910390fd5b61078f82826118b9565b5050565b60006107a18585858561194c565b9050949350505050565b60006107b5611f38565b6001600086815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201805480602002602001604051908101604052809291908181526020016000905b82821015610958578382906000526020600020906003020160405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff1660ff1660ff1681525050815260200190600101906108f5565b5050505081526020016005820160009054906101000a900460ff1615151515815250509050600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff1614156109f1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e890612a15565b60405180910390fd5b60008060006020860151925060408601519150606086015160001a9050610a16611f9c565b60405180606001604052808581526020018481526020018360ff1681525090506000805b8660800151518160ff16108015610a4f575081155b15610abd57826000015187608001518260ff1681518110610a6c57fe5b602002602001015160000151148015610aa65750826020015187608001518260ff1681518110610a9857fe5b602002602001015160200151145b15610ab057600191505b8080600101915050610a3a565b819750505050505050509392505050565b6000610afa7f114e74f6ea3bd819998f78687bfcb11b140da08e9b7d222fa9c1f1ba1f2aa12233610f88565b610b39576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b30906129f5565b60405180910390fd5b60006001600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050600073ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610c20576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c17906129d5565b60405180910390fd5b888160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550878160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085816002018190555084816003018190555060018160050160006101000a81548160ff021916908315150217905550806001600089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060028201548160020155600382015481600301556004820181600401908054610e1e929190611fc6565b506005820160009054906101000a900460ff168160050160006101000a81548160ff021916908315150217905550905050867f889569e4303664728fba29a472b24d3032707e6ebbee9a46e070c5c8f2ae4c258a8a8460020154604051610e8793929190612859565b60405180910390a26001915050979650505050505050565b7f114e74f6ea3bd819998f78687bfcb11b140da08e9b7d222fa9c1f1ba1f2aa12281565b60008173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614905092915050565b6000610f2582600080868152602001908152602001600020600001611cb090919063ffffffff16565b905092915050565b600060018585858560405160008152602001604052604051610f529493929190612950565b6020604051602081039080840390855afa158015610f74573d6000803e3d6000fd5b505050602060405103519050949350505050565b6000610fb182600080868152602001908152602001600020600001611cca90919063ffffffff16565b905092915050565b6000610fc3611f38565b6001600085815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201805480602002602001604051908101604052809291908181526020016000905b82821015611166578382906000526020600020906003020160405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff1660ff1660ff168152505081526020019060010190611103565b5050505081526020016005820160009054906101000a900460ff1615151515815250509050600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff16141591505092915050565b6000801b81565b60006111ef600080848152602001908152602001600020600001611cfa565b9050919050565b6000806001600084815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050600073ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156112df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112d690612a75565b60405180910390fd5b8060050160009054906101000a900460ff16611330576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161132790612a55565b60405180910390fd5b60008160050160006101000a81548160ff021916908315150217905550806001600085815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060028201548160020155600382015481600301556004820181600401908054611496929190611fc6565b506005820160009054906101000a900460ff168160050160006101000a81548160ff021916908315150217905550905050827f80d4746828447d65eceb938c7f9d85fbeb232fe7819d5209ed452b3940f8904b33426040516114f9929190612830565b60405180910390a26001915050919050565b6115316000808481526020019081526020016000206002015461152c61181e565b610f88565b611570576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161156790612a35565b60405180910390fd5b61157a82826118b9565b5050565b6000611588611f38565b6001600084815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201805480602002602001604051908101604052809291908181526020016000905b8282101561172b578382906000526020600020906003020160405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff1660ff1660ff1681525050815260200190600101906116c8565b5050505081526020016005820160009054906101000a900460ff16151515158152505090508060a0015191505092915050565b6001602052816000526040600020602052806000526040600020600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030154908060050160009054906101000a900460ff16905085565b6000611816836000018373ffffffffffffffffffffffffffffffffffffffff1660001b611d0f565b905092915050565b600033905090565b61184d816000808581526020019081526020016000206000016117ee90919063ffffffff16565b156118b55761185a61181e565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6118e081600080858152602001908152602001600020600001611d7f90919063ffffffff16565b15611948576118ed61181e565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b60006119787f114e74f6ea3bd819998f78687bfcb11b140da08e9b7d222fa9c1f1ba1f2aa12233610f88565b6119b7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119ae906129f5565b60405180910390fd5b60006001600087815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050600073ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611a9f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a9690612a15565b60405180910390fd5b606084848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050905060008060006020840151925060408401519150606084015160001a9050611b0d611f9c565b60405180606001604052808581526020018481526020018360ff1681525090506000805b87600401805490508160ff16108015611b48575081155b15611bc0578260000151886004018260ff1681548110611b6457fe5b906000526020600020906003020160000154148015611ba957508260200151886004018260ff1681548110611b9557fe5b906000526020600020906003020160010154145b15611bb357600191505b8080600101915050611b31565b8115611bd757600098505050505050505050611ca8565b87600401839080600181540180825580915050600190039060005260206000209060030201600090919091909150600082015181600001556020820151816001015560408201518160020160006101000a81548160ff021916908360ff16021790555050507f0ffaced37e4d6f4a46de47c31d21fccaad48817a7da7f346154835a547780ecd8860000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168385604051611c93939291906128e3565b60405180910390a16001985050505050505050505b949350505050565b6000611cbf8360000183611daf565b60001c905092915050565b6000611cf2836000018373ffffffffffffffffffffffffffffffffffffffff1660001b611e1c565b905092915050565b6000611d0882600001611e3f565b9050919050565b6000611d1b8383611e1c565b611d74578260000182908060018154018082558091505060019003906000526020600020016000909190919091505582600001805490508360010160008481526020019081526020016000208190555060019050611d79565b600090505b92915050565b6000611da7836000018373ffffffffffffffffffffffffffffffffffffffff1660001b611e50565b905092915050565b600081836000018054905011611dfa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611df190612995565b60405180910390fd5b826000018281548110611e0957fe5b9060005260206000200154905092915050565b600080836001016000848152602001908152602001600020541415905092915050565b600081600001805490509050919050565b60008083600101600084815260200190815260200160002054905060008114611f2c5760006001820390506000600186600001805490500390506000866000018281548110611e9b57fe5b9060005260206000200154905080876000018481548110611eb857fe5b9060005260206000200181905550600183018760010160008381526020019081526020016000208190555086600001805480611ef057fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050611f32565b60009150505b92915050565b6040518060c00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001606081526020016000151581525090565b60405180606001604052806000801916815260200160008019168152602001600060ff1681525090565b82805482825590600052602060002090600302810192821561204f5760005260206000209160030282015b8281111561204e57828260008201548160000155600182015481600101556002820160009054906101000a900460ff168160020160006101000a81548160ff021916908360ff160217905550505091600301919060030190611ff1565b5b50905061205c9190612060565b5090565b5b808211156120975760008082016000905560018201600090556002820160006101000a81549060ff021916905550600301612061565b5090565b6000813590506120aa81612bf9565b92915050565b6000813590506120bf81612c10565b92915050565b60008083601f8401126120d757600080fd5b8235905067ffffffffffffffff8111156120f057600080fd5b60208301915083600182028301111561210857600080fd5b9250929050565b600082601f83011261212057600080fd5b813561213361212e82612b18565b612aeb565b9150808252602083016020830185838301111561214f57600080fd5b61215a838284612bea565b50505092915050565b60008135905061217281612c27565b92915050565b60008135905061218781612c3e565b92915050565b600080604083850312156121a057600080fd5b60006121ae8582860161209b565b92505060206121bf8582860161209b565b9150509250929050565b600080600080600080600060c0888a0312156121e457600080fd5b60006121f28a828b0161209b565b97505060206122038a828b0161209b565b96505060406122148a828b016120b0565b95505060606122258a828b01612163565b94505060806122368a828b01612163565b93505060a088013567ffffffffffffffff81111561225357600080fd5b61225f8a828b016120c5565b925092505092959891949750929550565b6000806040838503121561228357600080fd5b60006122918582860161209b565b92505060206122a2858286016120b0565b9150509250929050565b6000602082840312156122be57600080fd5b60006122cc848285016120b0565b91505092915050565b600080604083850312156122e857600080fd5b60006122f6858286016120b0565b92505060206123078582860161209b565b9150509250929050565b6000806000806060858703121561232757600080fd5b6000612335878288016120b0565b94505060206123468782880161209b565b935050604085013567ffffffffffffffff81111561236357600080fd5b61236f878288016120c5565b925092505092959194509250565b60008060006060848603121561239257600080fd5b60006123a0868287016120b0565b93505060206123b18682870161209b565b925050604084013567ffffffffffffffff8111156123ce57600080fd5b6123da8682870161210f565b9150509250925092565b600080604083850312156123f757600080fd5b6000612405858286016120b0565b925050602061241685828601612163565b9150509250929050565b6000806000806080858703121561243657600080fd5b6000612444878288016120b0565b945050602061245587828801612178565b9350506040612466878288016120b0565b9250506060612477878288016120b0565b91505092959194509250565b61248c81612bb4565b82525050565b61249b81612b55565b82525050565b6124aa81612b67565b82525050565b6124b981612b73565b82525050565b6124c881612b73565b82525050565b60006124db602283612b44565b91507f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e60008301527f64730000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612541602f83612b44565b91507f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60008301527f2061646d696e20746f206772616e7400000000000000000000000000000000006020830152604082019050919050565b60006125a7601983612b44565b91507f43726564656e7469616c20616c726561647920657869737473000000000000006000830152602082019050919050565b60006125e7601883612b44565b91507f43616c6c6572206973206e6f74206120697373756572203200000000000000006000830152602082019050919050565b6000612627601983612b44565b91507f43726564656e7469616c20646f65736e277420657869737473000000000000006000830152602082019050919050565b6000612667603083612b44565b91507f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60008301527f2061646d696e20746f207265766f6b65000000000000000000000000000000006020830152604082019050919050565b60006126cd601d83612b44565b91507f43726564656e7469616c20697320616c7265616479207265766f6b65640000006000830152602082019050919050565b600061270d601d83612b44565b91507f63726564656e7469616c206861736820646f65736e27742065786973740000006000830152602082019050919050565b600061274d602f83612b44565b91507f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008301527f20726f6c657320666f722073656c6600000000000000000000000000000000006020830152604082019050919050565b6060820160008201516127bc60008501826124b0565b5060208201516127cf60208501826124b0565b5060408201516127e260408501826127f7565b50505050565b6127f181612b9d565b82525050565b61280081612ba7565b82525050565b61280f81612ba7565b82525050565b600060208201905061282a6000830184612492565b92915050565b60006040820190506128456000830185612483565b61285260208301846127e8565b9392505050565b600060608201905061286e6000830186612492565b61287b6020830185612492565b61288860408301846127e8565b949350505050565b600060a0820190506128a56000830188612492565b6128b26020830187612492565b6128bf60408301866127e8565b6128cc60608301856127e8565b6128d960808301846124a1565b9695505050505050565b600060a0820190506128f86000830186612492565b61290560208301856124a1565b61291260408301846127a6565b949350505050565b600060208201905061292f60008301846124a1565b92915050565b600060208201905061294a60008301846124bf565b92915050565b600060808201905061296560008301876124bf565b6129726020830186612806565b61297f60408301856124bf565b61298c60608301846124bf565b95945050505050565b600060208201905081810360008301526129ae816124ce565b9050919050565b600060208201905081810360008301526129ce81612534565b9050919050565b600060208201905081810360008301526129ee8161259a565b9050919050565b60006020820190508181036000830152612a0e816125da565b9050919050565b60006020820190508181036000830152612a2e8161261a565b9050919050565b60006020820190508181036000830152612a4e8161265a565b9050919050565b60006020820190508181036000830152612a6e816126c0565b9050919050565b60006020820190508181036000830152612a8e81612700565b9050919050565b60006020820190508181036000830152612aae81612740565b9050919050565b6000602082019050612aca60008301846127e8565b92915050565b6000602082019050612ae56000830184612806565b92915050565b6000604051905081810181811067ffffffffffffffff82111715612b0e57600080fd5b8060405250919050565b600067ffffffffffffffff821115612b2f57600080fd5b601f19601f8301169050602081019050919050565b600082825260208201905092915050565b6000612b6082612b7d565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000612bbf82612bc6565b9050919050565b6000612bd182612bd8565b9050919050565b6000612be382612b7d565b9050919050565b82818337600083830152505050565b612c0281612b55565b8114612c0d57600080fd5b50565b612c1981612b73565b8114612c2457600080fd5b50565b612c3081612b9d565b8114612c3b57600080fd5b50565b612c4781612ba7565b8114612c5257600080fd5b5056fea264697066735822122000aa2189e5538b9b767870a53daf63230095faaab2aaf2a09a40a0c1613e9ee964736f6c634300060c0033"
}