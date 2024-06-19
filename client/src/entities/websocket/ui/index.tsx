'use client'
import { setMessage } from '@/entities/message'
import { useAppDispatch } from '@/shared/hooks/reduxToolkit'
import useWebSocket from '@/shared/hooks/useWebsocket'
import React, { useEffect } from 'react'



export const Websocket = () => {
    const socket = useWebSocket()
    const dispatch = useAppDispatch()
    useEffect(()=> {
     socket?.on('receiveMessage', (data)=> dispatch(setMessage(data)))
    }, [socket])

  return (
    <></>
  )
}
