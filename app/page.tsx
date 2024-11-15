import React from 'react'
import Connect from './components/Connect'
import { SendTransaction } from './components/SendTrnascations'
import ReadContract from './components/ReadContract'
import ReadContractAdd from './components/AddRead'
import { WriteContract } from './components/WriteContract'
import { Student } from './components/Student'



const page = () => {
  return (
    <div>
      <Connect/>
      <SendTransaction/>
      <ReadContract/>
      <ReadContractAdd/>
      <WriteContract/>
      <Student/>
      
      

     
      

    



    </div>
  )
}

export default page