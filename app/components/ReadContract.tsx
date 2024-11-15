'use client'
import React from 'react';
import { useReadContract } from 'wagmi';
import { abi } from '../Abi'; 

const ReadContract = () => {
    const { data, isError, isLoading } = useReadContract({
        abi: abi,
        address: '0x780651483c866b270882427a58f9a80a91e0dc90', // Updated with your contract address
        functionName: 'getGreeting' // Calling the getGreeting function as defined in the ABI
    });

    return (
        <div>
            <h1>Read Contract</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error reading contract data.</p>}
            {data && <p>Greeting: {data}</p>}
        </div>
    );
}
export default ReadContract;
