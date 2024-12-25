export default [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sauceAdd",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "stakingAdd",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "sauce",
		"outputs": [
			{
				"internalType": "contract ISauce",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "staking",
		"outputs": [
			{
				"internalType": "contract IStaking",
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
				"name": "holder",
				"type": "address"
			}
		],
		"name": "tokenOfOwner",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakeType",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "unclaimed",
						"type": "uint256"
					}
				],
				"internalType": "struct sauceInfoArr[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]