'use client'
import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'


const Connect = () => {
  const account = useAccount()
  const { connect, connectors, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <h1>
        status : {account.status}
      </h1>
      <h1>
        address: {JSON.stringify(account.address)}
      </h1>
     
      {account && <p>Connected to {account.address}</p>}
    
      <div>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
          </button>
        ))}
      </div>
      <div>
        {account.address && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </div>
      <div>
        {error && <p>{error.message}</p>}
      </div>
    </div>
  )
}
export default Connect