'use client'
import React, { FC, useEffect, useState } from 'react'
import styles from './ChatPage.module.scss'
import useWebSocket from '@/shared/hooks/useWebsocket'
import TextArea from 'antd/es/input/TextArea'
import { RiMailSendLine } from 'react-icons/ri'
import { useGetMeQuery } from '@/entities/user'
import { addMessage, messageSelector, setMessages, useGetMessagesQuery } from '@/entities/message'
import cs from 'classnames'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxToolkit'

interface IProps {
    contactId: number
}

export const ChatPage: FC<IProps> = ({contactId}) => {
  const dispatch = useAppDispatch()
  const [typing, setTyping] = useState<boolean>(false)
  const [receiverTyping, SetReceiverTyping] = useState<{receiverId: number, value: boolean}>()
  const [message, setMessage] = useState<string | undefined>()
  const {messages: messagesFromStore} = useAppSelector(messageSelector)
  const {data: user} = useGetMeQuery()
  const socket = useWebSocket()
  const {id: senderId} = user || {}
  const {data: messages, refetch, isLoading} =  useGetMessagesQuery({senderId: +senderId!, receiverId: contactId}, {skip: senderId ? false : true})

    const handleSend = async ()=> {
      socket?.emit('message', {content: message, senderId, receiverId: contactId})
      setMessage(undefined)
      setTyping(false)
      refetch()
    }

    
    useEffect(()=> {
      messages && dispatch(setMessages(messages))
    }, [messages])
    
    useEffect(()=> {
      socket?.emit('typing', {senderId, receiverId: contactId, value: typing})
    }, [typing])
    
    
    useEffect(()=> {
      socket?.on('typing', (data)=>{ SetReceiverTyping(data)})
      socket?.on('receiveMessage', (data)=>{ dispatch(addMessage(data.message)); console.log(messagesFromStore)})
    }, [socket])
    
    const {value: receiverIsTyping, receiverId: receiverTypingId} = receiverTyping || {}


  return (
    <div className={styles.root} >
        <h1 className={styles.title} >Чат</h1>
        <ul className={styles.messagesHolder} >{messagesFromStore?.map(({id, content, senderId: sender})=> {
          return <li key={id} className={cs(styles.message, styles[senderId && +senderId === sender ? 'senderMessage':'receiverMessage'])} >{content}</li>
        })}
        <div className={styles.typingAnimation} >{receiverIsTyping && receiverTypingId === contactId ? '...': ''}</div>
        </ul>
        <div className={styles.inputHolder} ><TextArea value={message} onKeyDown={()=> { setTyping(true)}} onKeyUp={()=> { setTyping(false)}} onChange={(e)=>{ setMessage(e.target.value);}} autoSize className={styles.input} /> <RiMailSendLine onClick={handleSend} /></div>
    </div>
  )
}
