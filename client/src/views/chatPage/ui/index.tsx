'use client'
import React, { FC } from 'react'
import styles from './ChatPage.module.scss'
import useWebSocket from '@/shared/hooks/useWebsocket'
import { Input } from 'antd'


interface IProps {
    contactId: number
}

export const ChatPage: FC<IProps> = ({contactId}) => {
    const websocket = useWebSocket()
    console.log(contactId)
  return (
    <div className={styles.root} >
        <h1 className={styles.title} >Чат</h1>
        <div className={styles.inputHolder} ><Input className={styles.input} /></div>
    </div>
  )
}
