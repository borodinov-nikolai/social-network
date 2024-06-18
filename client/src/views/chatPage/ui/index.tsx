'use client'
import React, { FC, useEffect, useState } from 'react'
import styles from './ChatPage.module.scss'
import useWebSocket from '@/shared/hooks/useWebsocket'
import TextArea from 'antd/es/input/TextArea'
import { RiMailSendLine } from 'react-icons/ri'


interface IProps {
    contactId: number
}

export const ChatPage: FC<IProps> = ({contactId}) => {
  const [message, setMessage] = useState<string | undefined>()
  const [receiveMessage, setReceiveMessage] = useState<string | undefined>()
  
    const socket = useWebSocket()
    

    const handleSend = async ()=> {
      socket?.emit('message', {message, contactId})
      setMessage(undefined)
    }

     
    useEffect(()=> {
      socket?.on('receiveMessage', (data)=> setReceiveMessage(data))
    }, [socket])
    

  return (
    <div className={styles.root} >
        <h1 className={styles.title} >Чат</h1>
        <div className={styles.messagesHolder} >{receiveMessage}</div>
        <div className={styles.inputHolder} ><TextArea value={message} onChange={(e)=> setMessage(e.target.value)} autoSize className={styles.input} /> <RiMailSendLine onClick={handleSend} /></div>
    </div>
  )
}
