import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const MessageBox = () => {
  return <>
    <div className="message-box gradient-bg">
        <p className="normal-para white"> <span><AiOutlineInfoCircle /></span> Claiming below 1.1 peg will not receive a redemption bonus, claim wisely!</p>
    </div>
  </>
}

export default MessageBox