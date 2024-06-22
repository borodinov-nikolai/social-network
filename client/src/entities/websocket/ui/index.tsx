'use client'
import { useGetContactMessagesAndCountQuery } from '@/entities/contact'
import { messageSelector, setMessages, useGetMessagesQuery, useGetMessagesUnreadCountQuery } from '@/entities/message'
import { useGetMeQuery } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxToolkit'
import WebSocketSingleton from '@/shared/hooks/useWebsocket'
import React, { useEffect } from 'react'



export const Websocket = () => {
  const dispatch = useAppDispatch()
  const { data: user } = useGetMeQuery()
  const {queryData} = useAppSelector(messageSelector)
  const { refetch: messagesCountRefetch } = useGetMessagesUnreadCountQuery(user?.id!, { skip: user?.id ? false : true })
  const {refetch: refetchContacts} = useGetContactMessagesAndCountQuery(user?.id!, {skip: user?.id ? false: true})
  const {data: messages, refetch, isUninitialized} = useGetMessagesQuery(queryData!, {skip: queryData?.senderId ? false : true})
  const socket = WebSocketSingleton.getInstance()
  // console.log(messages)
  useEffect(() => {
    dispatch(setMessages(messages!))
    if(!isUninitialized) {
      socket?.on('receiveMessage', (data) =>{refetch(), messagesCountRefetch(); refetchContacts()})
    }
    
   
  }, [socket, queryData, isUninitialized, messages])

  return (
    <></>
  )
}
