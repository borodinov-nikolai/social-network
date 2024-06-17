import { ChatPage } from '@/views/chatPage'
import React from 'react'


const page = ({params}:{params: {id: string}}) => {
 
  return (
    <>
    <ChatPage contactId={+params.id} />
    </>
  )
}

export default page