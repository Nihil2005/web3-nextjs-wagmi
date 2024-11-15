import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { abi } from '../Abi';

const ReadContractxx = () => {
    const [greeting, setGreeting] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGreeting = async () => {
            try {
                setIsLoading(true);

                // Check if MetaMask is available
                if (!(window as any).ethereum) {
                    throw new Error("MetaMask is required to access the blockchain");
                }

                // Use MetaMask provider
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                await provider.send("eth_requestAccounts", []); // Request account access

                const contractAddress = '0x9FbB8761D5a4A66656148F5F3434Ee95136a9920';
                const contract = new ethers.Contract(contractAddress, abi, provider);

                // Call the contract method to get the greeting
                const data = await contract.getGreeting();
                setGreeting(data);
            } catch (err: any) {
                console.error('Error reading contract:', err);
                // Set a more descriptive error message
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };        fetchGreeting();
    }, []);

    return (
        <div>
            <h1>Read Contract</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error in red */}
            {greeting && <p>Greeting: {greeting}</p>}
        </div>
    );
};

export default ReadContractxx;