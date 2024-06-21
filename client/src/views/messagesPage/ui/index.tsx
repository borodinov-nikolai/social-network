'use client'
import React from 'react'
import styles from './MessagesPage.module.scss'
import { IUser, useGetMeQuery } from '@/entities/user'
import { imageUrl } from '@/entities/image'
import { Avatar } from 'antd'
import { MdAccountCircle } from 'react-icons/md'
import { Link } from '@/navigation'
import { useGetContactMessagesAndCountQuery } from '@/entities/contact'



export const MessagesPage = () => {
  const {data: user} = useGetMeQuery()
  const senderId = user?.id
  const {data: contactsWithCount} = useGetContactMessagesAndCountQuery(user?.id!, {skip: user?.id ? false: true})



  

  return (
    <div className={styles.root} >
      <h1>Диалоги</h1>
           <ul className={styles.usersList} >
          {
            (contactsWithCount as {contact: IUser, count: number}[])?.filter(({contact})=> contact.id !== senderId).map(({contact, count})=> {
              const {id, login, avatar} = contact
              return <li className={styles.userCard} key={id} >
                  <Link href={{pathname: '/contacts/chat/[id]', params: {id: id}}}>
                 <Avatar src={imageUrl + avatar} className={styles.avatar} size={50} icon={<MdAccountCircle/>} />
                <p>{login}</p>
                   {count > 0 && <p className={styles.count} >{count}</p>}
                  </Link>
                </li>
            })
          }
        </ul>
    </div>
  )
}
