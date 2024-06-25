'use client'
import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.scss'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { useGetMessagesUnreadCountQuery } from '@/entities/message'
import { useGetMeQuery } from '@/entities/user'
import { Badge } from 'antd'
import { usePathname } from 'next/navigation'



export const Navbar = () => {

  const t = useTranslations('navbar')
  const {data: user} = useGetMeQuery()
  const {data: messagesUnreadCount} = useGetMessagesUnreadCountQuery(user?.id!, {skip: user?.id ? false: true})
 
  

  return (
    <nav className={styles.root} >
        <ul className={styles.list}>
            <li><Link href={'/'} >{t('lent')}</Link></li>
            <li><Link href={'/contacts'} >{t('contacts')}</Link></li>
           
              <li> <Link href={'/messages'} > <Badge count={messagesUnreadCount} >{t('messages')}</Badge> </Link> </li>
           
            <li><Link href={'/'} >{t('groups')}</Link></li>
            <li><Link href={'/'} >{t('music')}</Link></li>
            <li><Link href={'/'} >{t('videos')}</Link></li>
        </ul>
    </nav>
  )
}
