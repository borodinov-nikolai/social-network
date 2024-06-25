'use client'
import React, { useTransition } from 'react'
import styles from './MobileNavbar.module.scss'
import { Badge } from 'antd'
import { Link } from '@/navigation'
import { useGetMessagesUnreadCountQuery } from '@/entities/message'
import { useGetMeQuery } from '@/entities/user'
import { MdGroups, MdRssFeed } from 'react-icons/md'
import { IoMdContacts } from 'react-icons/io'
import { TiMessages } from 'react-icons/ti'
import { IoMusicalNotesSharp } from 'react-icons/io5'
import { PiVideoFill } from 'react-icons/pi'


export const MobileNavbar = () => {
  const {data: user} = useGetMeQuery()
  const {data: messagesUnreadCount} = useGetMessagesUnreadCountQuery(user?.id!, {skip: user?.id ? false: true})
  return (
    <div className={styles.root} >
      <div className='container' >
        <nav >
                 <ul className={styles.list}>
                <li><Link href={'/'} ><MdRssFeed /></Link></li>
                <li><Link href={'/contacts'} ><IoMdContacts /></Link></li>
      
                  <li> <Link href={'/messages'} > <Badge count={messagesUnreadCount} ><TiMessages /></Badge> </Link> </li>
      
                <li><Link href={'/'} ><MdGroups /></Link></li>
                <li><Link href={'/'} ><IoMusicalNotesSharp /></Link></li>
                <li><Link href={'/'} ><PiVideoFill /></Link></li>
            </ul>
        </nav>
      </div>
    </div>
  )
}
