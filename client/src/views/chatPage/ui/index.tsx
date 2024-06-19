'use client'
import React, { FC, useEffect, useState } from 'react'
import styles from './ChatPage.module.scss'
import useWebSocket from '@/shared/hooks/useWebsocket'
import TextArea from 'antd/es/input/TextArea'
import { RiMailSendLine } from 'react-icons/ri'
import { useGetMeQuery } from '@/entities/user'


interface IProps {
    contactId: number
}

export const ChatPage: FC<IProps> = ({contactId}) => {
  const [message, setMessage] = useState<string | undefined>()
  const [receiveMessage, setReceiveMessage] = useState<{from: number, message: string} | undefined>()
  const {data: user} = useGetMeQuery()
    const socket = useWebSocket()
    const {id: userId} = user || {}

    const handleSend = async ()=> {
      socket?.emit('message', {message, userId, contactId})
      setMessage(undefined)
    }

     
  
console.log(receiveMessage)
  return (
    <div className={styles.root} >
        <h1 className={styles.title} >Чат</h1>
        <div className={styles.messagesHolder} >{receiveMessage?.message}</div>
        <div className={styles.inputHolder} ><TextArea value={message} onChange={(e)=> setMessage(e.target.value)} autoSize className={styles.input} /> <RiMailSendLine onClick={handleSend} /></div>
    </div>
  )
}
