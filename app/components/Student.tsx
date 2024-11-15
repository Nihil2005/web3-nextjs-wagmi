'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { toast } from 'react-hot-toast';

export function Student() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: hash, error, isPending, writeContract } = useWriteContract();

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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "deleteStudent",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "StudentDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
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
		"name": "StudentUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
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
		"name": "updateStudent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
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
] as const;

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Read student data
  const { data: studentData, refetch: refetchStudent } = useReadContract({
    address: '0x9cf30cc12e8c4ab7eca1ff089d6509f2e6726d12',
    abi: studentContractAbi,
    functionName: 'getStudent',
    args: [BigInt(index)],
  });

  // Read student count
  const { data: studentCount } = useReadContract({
    address: '0x9cf30cc12e8c4ab7eca1ff089d6509f2e6726d12',
    abi: studentContractAbi,
    functionName: 'getStudentCount',
  });

  const clearForm = () => {
    setName('');
    setAge('');
    setGrade('');
    setIndex(0);
  };

  const handleAddStudent = async () => {
    try {
      setLoading(true);
      
      if (!name || !age || !grade) {
        toast.error('Please fill all fields');
        return;
      }

      await writeContract({
        address: '0x9cf30cc12e8c4ab7eca1ff089d6509f2e6726d12',
        abi: studentContractAbi,
        functionName: 'addStudent',
        args: [name, BigInt(age), grade],
      });

      toast.success('Student added successfully!');
      clearForm();
      refetchStudent();
    } catch (error: any) {
      toast.error('Failed to add student: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      setLoading(true);

      if (!name || !age || !grade) {
        toast.error('Please fill all fields');
        return;
      }

      if (!studentCount || index >= Number(studentCount)) {
        toast.error(`No student exists at index ${index}`);
        return;
      }

      await writeContract({
        address: '0x9cf30cc12e8c4ab7eca1ff089d6509f2e6726d12',
        abi: studentContractAbi,
        functionName: 'updateStudent',
        args: [BigInt(index), name, BigInt(age), grade],
      });

      toast.success('Student updated successfully!');
      clearForm();
      refetchStudent();
    } catch (error: any) {
      toast.error('Failed to update student: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      setLoading(true);

      if (!studentCount || index >= Number(studentCount)) {
        toast.error(`No student exists at index ${index}`);
        return;
      }

      await writeContract({
        address: '0x9cf30cc12e8c4ab7eca1ff089d6509f2e6726d12',
        abi: studentContractAbi,
        functionName: 'deleteStudent',
        args: [BigInt(index)],
      });

      toast.success('Student deleted successfully!');
      clearForm();
      refetchStudent();
    } catch (error: any) {
      toast.error('Failed to delete student: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Student Management System</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Student Index</label>
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter student index"
              type="number"
              onChange={(e) => setIndex(Number(e.target.value))}
              value={index}
              min="0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Student Name</label>
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter student name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Age</label>
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="number"
              placeholder="Enter age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              min="0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Grade</label>
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter grade"
              onChange={(e) => setGrade(e.target.value)}
              value={grade}
            />
          </div>
        </div>

        <div className="space-y-4">
          {studentData && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Student Details</h3>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-medium">Name:</span> {studentData[0]}</p>
                <p className="text-gray-700"><span className="font-medium">Age:</span> {Number(studentData[1])}</p>
                <p className="text-gray-700"><span className="font-medium">Grade:</span> {studentData[2]}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
              disabled={loading || isPending}
              onClick={handleAddStudent}
            >
              {loading || isPending ? 'Processing...' : 'Add Student'}
            </button>

            <button
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
              disabled={loading || isPending}
              onClick={handleUpdateStudent}
            >
              {loading || isPending ? 'Processing...' : 'Update Student'}
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
              disabled={loading || isPending}
              onClick={handleDeleteStudent}
            >
              {loading || isPending ? 'Processing...' : 'Delete Student'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {hash && (
          <div className="bg-blue-50 text-blue-700 p-3 rounded-lg">
            Transaction Hash: {hash}
          </div>
        )}
        {isConfirming && (
          <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg">
            Waiting for confirmation...
          </div>
        )}
        {isConfirmed && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg">
            Transaction confirmed!
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg">
            Error: {error?.message || 'An error occurred'}
          </div>
        )}
      </div>
    </div>
  );
}
