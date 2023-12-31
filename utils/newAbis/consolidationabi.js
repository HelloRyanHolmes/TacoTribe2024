export default [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "balanceBT",
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
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakeType",
						"type": "uint256"
					}
				],
				"internalType": "struct TacoStaking.data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "balanceDP",
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
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakeType",
						"type": "uint256"
					}
				],
				"internalType": "struct TacoStaking.data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "balanceDoodle",
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
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakeType",
						"type": "uint256"
					}
				],
				"internalType": "struct TacoStaking.data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "balanceGS",
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
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakeType",
						"type": "uint256"
					}
				],
				"internalType": "struct TacoStaking.data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "balanceGT",
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
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakeType",
						"type": "uint256"
					}
				],
				"internalType": "struct TacoStaking.data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "balancePT",
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
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakeType",
						"type": "uint256"
					}
				],
				"internalType": "struct TacoStaking.data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "balanceTaco",
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
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakeType",
						"type": "uint256"
					}
				],
				"internalType": "struct TacoStaking.data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bt",
		"outputs": [
			{
				"internalType": "contract IBabyTaco",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "doodle",
		"outputs": [
			{
				"internalType": "contract IDoodle",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dp",
		"outputs": [
			{
				"internalType": "contract IDPTaco",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gs",
		"outputs": [
			{
				"internalType": "contract IGuacSour",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gt",
		"outputs": [
			{
				"internalType": "contract IGuaco",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pt",
		"outputs": [
			{
				"internalType": "contract IPixelTaco",
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
		"inputs": [],
		"name": "taco",
		"outputs": [
			{
				"internalType": "contract ITaco",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];