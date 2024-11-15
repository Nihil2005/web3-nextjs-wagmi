'use client'
import React, { useState } from 'react';
import { useAccount, useReadContract} from 'wagmi';
import { abix } from '../contracts/Add_abi';
const ReadContractAdd = () => {
    const { address } = useAccount();
    const [num1, setNum1] = useState<bigint>(BigInt(0));
    const [num2, setNum2] = useState<bigint>(BigInt(0));
    
    // Fetching the result of the `add` function
    const { data, isError, isLoading } = useReadContract({
        address: '0x79119bef87fed827c1382d75fb505ada9b8ba6d5', // Your contract address
        abi: abix,
        functionName: 'add', // Function name
        args: [num1, num2], // Arguments passed to the function
    });

    const handleAdd = () => {
        // Trigger the contract read with updated arguments
        console.log(`Adding ${num1} + ${num2}`);
    };

    return (
        <div>
            <h1>Read Contract</h1>
            <input 
                type="number" 
                value={Number(num1)} 
                onChange={(e) => setNum1(BigInt(e.target.value))} 
                placeholder="Enter number 1" 
            />
            <input 
                type="number" 
                value={Number(num2)} 
                onChange={(e) => setNum2(BigInt(e.target.value))} 
                placeholder="Enter number 2" 
            />
            <button onClick={handleAdd}>Add Numbers</button>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error reading contract data.</p>}
            {data && <p>The sum is: {data.toString()}</p>}
        </div>
    );
}
export default ReadContractAdd;
