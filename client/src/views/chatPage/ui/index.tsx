'use client'
import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './ChatPage.module.scss'
import TextArea from 'antd/es/input/TextArea'
import { RiMailSendLine } from 'react-icons/ri'
import { useGetMeQuery } from '@/entities/user'
import { messageSelector, setQueryData, useGetMessagesQuery, useMakeMessageReadMutation } from '@/entities/message'
import cs from 'classnames'
import {useAppDispatch, useAppSelector } from '@/shared/hooks/reduxToolkit'
import WebSocketSingleton from '@/shared/hooks/useWebsocket'


interface IProps {
    contactId: number
}

export const ChatPage: FC<IProps> = ({contactId}) => {
  const dispatch = useAppDispatch()
  const {messages} = useAppSelector(messageSelector)
  const [typing, setTyping] = useState<boolean>(false)
  const [receiverTyping, SetReceiverTyping] = useState<{receiverId: number, value: boolean}>()
  const [message, setMessage] = useState<string | undefined>()
  const {data: user} = useGetMeQuery()
  const socket = WebSocketSingleton.getInstance()
  const {id: senderId} = user || {}
  const {refetch, isUninitialized} = useGetMessagesQuery({senderId: +senderId!, receiverId: contactId}, {skip: senderId ? false : true})
  const [makeMessagesRead] =  useMakeMessageReadMutation()
  let isMounted = useRef(false)
    console.log(messages)

    const handleSend = async ()=> {
      socket?.emit('message', {content: message, senderId, receiverId: contactId})
      setMessage(undefined)
      setTyping(false)
      refetch()
    }



    useEffect(()=> {

      makeMessagesRead({userId: senderId!, contactId})
      if(!isUninitialized) {
        refetch()
      }
 
      dispatch(setQueryData({senderId: +senderId!, receiverId: contactId}))

     isMounted.current = true
    }, [senderId, contactId])
    
    useEffect(()=> {
      makeMessagesRead({userId: senderId!, contactId})
    }, [messages])
    
    useEffect(()=> {
      socket?.emit('typing', {senderId, receiverId: contactId, value: typing})
    }, [typing])
    
    
    useEffect(()=> {
      try {
        socket?.on('typing', (data)=>{ SetReceiverTyping(data)})
      } catch(e) {
        console.error(e)
      }
    }, [socket])
    
    const {value: receiverIsTyping, receiverId: receiverTypingId} = receiverTyping || {}


  return (
    <div className={styles.root} >
        <h1 className={styles.title} >Чат</h1>
        <ul className={styles.messagesHolder} >{messages?.map(({id, content, senderId: sender})=> {
          return <li key={id} className={cs(styles.message, styles[senderId && +senderId === sender ? 'senderMessage':'receiverMessage'])} >{content}</li>
        })}
        {receiverIsTyping && receiverTypingId === contactId ?<div className={styles.typing} >печатает</div>: <div></div>}
        </ul>
        <div className={styles.inputHolder} ><TextArea value={message} onFocus={()=> setTyping(true)} onBlur={()=> setTyping(false)} onChange={(e)=>{ setMessage(e.target.value);}} autoSize className={styles.input} /> <RiMailSendLine onClick={handleSend} /></div>
    </div>
  )
}
