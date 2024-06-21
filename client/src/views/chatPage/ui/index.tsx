'use client'
import React, { FC, useEffect, useState } from 'react'
import styles from './ChatPage.module.scss'
import useWebSocket from '@/shared/hooks/useWebsocket'
import TextArea from 'antd/es/input/TextArea'
import { RiMailSendLine } from 'react-icons/ri'
import { useGetMeQuery } from '@/entities/user'
import { addMessage, messageSelector, setMessages, useGetMessagesQuery, useMakeMessageReadMutation } from '@/entities/message'
import cs from 'classnames'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxToolkit'
import WebSocketSingleton from '@/shared/hooks/useWebsocket'
import { Divider } from 'antd'

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
  const socket = WebSocketSingleton.getInstance()
  const {id: senderId} = user || {}
  const {data: messages, refetch, isLoading} =  useGetMessagesQuery({senderId: +senderId!, receiverId: contactId}, {skip: senderId ? false : true})
   const [makeMessagesRead] =  useMakeMessageReadMutation()
    const handleSend = async ()=> {
      socket?.emit('message', {content: message, senderId, receiverId: contactId})
      setMessage(undefined)
      setTyping(false)
      refetch()
    }

    useEffect(()=> {
      makeMessagesRead({userId: senderId!, contactId})
    }, [])
    
    useEffect(()=> {
      messages && dispatch(setMessages(messages))
      makeMessagesRead({userId: senderId!, contactId})
    }, [messages])
    
    useEffect(()=> {
      socket?.emit('typing', {senderId, receiverId: contactId, value: typing})
    }, [typing])
    
    
    useEffect(()=> {
      try {
        socket?.on('typing', (data)=>{ SetReceiverTyping(data)})
        socket?.on('receiveMessage', (data)=>{ dispatch(addMessage(data.message)); console.log(messagesFromStore)})
      } catch(e) {
        console.error(e)
      }
    }, [socket])
    
    const {value: receiverIsTyping, receiverId: receiverTypingId} = receiverTyping || {}


  return (
    <div className={styles.root} >
        <h1 className={styles.title} >Чат</h1>
        <ul className={styles.messagesHolder} >{messagesFromStore?.map(({id, content, senderId: sender})=> {
          return <li key={id} className={cs(styles.message, styles[senderId && +senderId === sender ? 'senderMessage':'receiverMessage'])} >{content}</li>
        })}
        {receiverIsTyping && receiverTypingId === contactId ?<div className={styles.typing} >печатает</div>: <div></div>}
        </ul>
        <div className={styles.inputHolder} ><TextArea value={message} onFocus={()=> setTyping(true)} onBlur={()=> setTyping(false)} onChange={(e)=>{ setMessage(e.target.value);}} autoSize className={styles.input} /> <RiMailSendLine onClick={handleSend} /></div>
    </div>
  )
}
