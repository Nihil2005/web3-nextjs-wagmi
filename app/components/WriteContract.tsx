'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

export function WriteContract() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [grade, setGrade] = useState('')
  
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  // Sample ABI for student management - adjust according to your actual contract
  const studentContractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_grade",
				"type": "string"
			}
		],
		"name": "addStudent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "grade",
				"type": "string"
			}
		],
		"name": "StudentAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getStudent",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "grade",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStudentCount",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "students",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "grade",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]as const

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Student Management System</h2>
      
      <input
        className="border p-2 rounded"
        placeholder="Student Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      
      <input
        className="border p-2 rounded"
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
        value={age}
      />
      
      <input
        className="border p-2 rounded"
        placeholder="Grade"
        onChange={(e) => setGrade(e.target.value)}
        value={grade}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded"
        disabled={isPending}
        onClick={() =>
          writeContract({
            address: '0x652a7fbcde7e9f48e3174aac25bdd31521756a6a', // Contract address on Sepolia testnet
            abi: studentContractAbi,
            functionName: 'addStudent',
            args: [name, BigInt(age), grade],
          })
        }
      >
        {isPending ? 'Confirming...' : 'Add Student'}
      </button>

      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed!</div>}
      {error && (
        <div className="text-red-500">Error: {error.message}</div>
      )}
    </div>
  )
}
