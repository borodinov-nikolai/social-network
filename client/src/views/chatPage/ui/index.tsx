'use client'
import React, { FC, useEffect, useState } from 'react'
import styles from './ChatPage.module.scss'
import useWebSocket from '@/shared/hooks/useWebsocket'
import TextArea from 'antd/es/input/TextArea'
import { RiMailSendLine } from 'react-icons/ri'
import { useGetMeQuery } from '@/entities/user'
import { useGetMessagesQuery } from '@/entities/message'


interface IProps {
    contactId: number
}

export const ChatPage: FC<IProps> = ({contactId}) => {
  const [message, setMessage] = useState<string | undefined>()
  const [receiveMessage, setReceiveMessage] = useState<{from: number, message: string} | undefined>()
  const {data: user} = useGetMeQuery()
  const socket = useWebSocket()
  const {id: senderId} = user || {}
  const {data: messages} =  useGetMessagesQuery({senderId: +senderId!, receiverId: contactId}, {skip: senderId ? false : true})

    const handleSend = async ()=> {
      socket?.emit('message', {content: message, senderId, receiverId: contactId})
      setMessage(undefined)
    }

     console.log(messages)
  
console.log(receiveMessage)
  return (
    <div className={styles.root} >
        <h1 className={styles.title} >Чат</h1>
        <div className={styles.messagesHolder} >{receiveMessage?.message}</div>
        <div className={styles.inputHolder} ><TextArea value={message} onChange={(e)=> setMessage(e.target.value)} autoSize className={styles.input} /> <RiMailSendLine onClick={handleSend} /></div>
    </div>
  )
}
