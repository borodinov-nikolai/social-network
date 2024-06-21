'use client'
import React from 'react'
import styles from './MessagesPage.module.scss'
import { IUser, useGetMeQuery } from '@/entities/user'
import { useGetMessagesQuery } from '@/entities/message'
import { imageUrl } from '@/entities/image'
import { Avatar } from 'antd'
import { MdAccountCircle } from 'react-icons/md'
import { Link } from '@/navigation'



export const MessagesPage = () => {
  const {data: user} = useGetMeQuery()
  const senderId = user?.id
  const {data: messages} = useGetMessagesQuery({senderId: senderId!})
  
  const receivers: IUser[] = []
  messages?.map(({receiver})=> {
    const check = receivers?.some((item)=> item?.id === receiver.id)
    if(!check){
        receivers.push(receiver)
      }
    })

  return (
    <div className={styles.root} >
      <h1>Диалоги</h1>
           <ul className={styles.usersList} >
          {
            receivers?.filter((item)=> item.id !== senderId).map(({id, login, avatar})=> {
              return <li className={styles.userCard} key={id} >
                  <Link href={{pathname: '/contacts/chat/[id]', params: {id: id}}}>
                 <Avatar src={imageUrl + avatar} className={styles.avatar} size={50} icon={<MdAccountCircle/>} />
                <p>{login}</p>
              
                  </Link>
                </li>
            })
          }
        </ul>
    </div>
  )
}
