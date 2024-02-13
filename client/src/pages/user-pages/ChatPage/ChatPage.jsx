import React from 'react'
import Chat from '../../../components/user-components/Chat/Chat'

const ChatPage = ({socket}) => {
  return (
    <>
    <Chat socketIO={socket}/>
    </>
  )
}

export default ChatPage