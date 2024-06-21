'use client'
import { useGetContactMessagesAndCountQuery } from '@/entities/contact'
import { useGetMessagesUnreadCountQuery } from '@/entities/message'
import { useGetMeQuery } from '@/entities/user'
import WebSocketSingleton from '@/shared/hooks/useWebsocket'
import React, { useEffect } from 'react'



export const Websocket = () => {
  const { data: user } = useGetMeQuery()
  const { refetch } = useGetMessagesUnreadCountQuery(user?.id!, { skip: user?.id ? false : true })
  const {refetch: refetchContacts} = useGetContactMessagesAndCountQuery(user?.id!, {skip: user?.id ? false: true})

  const socket = WebSocketSingleton.getInstance()
  useEffect(() => {
    if(socket) {
      socket.on('receiveMessage', (data) =>{console.log(data); refetch(); refetchContacts()})
    }
  }, [socket])

  return (
    <></>
  )
}
