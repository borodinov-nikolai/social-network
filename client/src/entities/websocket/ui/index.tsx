'use client'
import { useGetMessagesUnreadCountQuery } from '@/entities/message'
import { useGetMeQuery } from '@/entities/user'
import useWebSocket from '@/shared/hooks/useWebsocket'
import React, { useEffect } from 'react'



export const Websocket = () => {
  const { data: user } = useGetMeQuery()
  const { refetch } = useGetMessagesUnreadCountQuery(user?.id!, { skip: user?.id ? false : true })
  const socket = useWebSocket()
  useEffect(() => {
    if(socket) {
      socket.on('receiveMessage', (data) => refetch())
    }
  }, [socket])

  return (
    <></>
  )
}
