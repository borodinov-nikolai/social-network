'use client'
import React from 'react'
import styles from './Navbar.module.scss'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { useAppSelector } from '@/shared/hooks/reduxToolkit'
import { messageSelector } from '@/entities/message'
import { Badge } from 'antd'


export const Navbar = () => {
  const t = useTranslations('navbar')
  const message = useAppSelector(messageSelector)
  
  console.log(message)
  return (
    <nav className={styles.root} >
        <ul className={styles.list}>
            <li><Link href={'/'} >{t('lent')}</Link></li>
            <li><Link href={'/contacts'} >{t('contacts')}</Link></li>
           
              <li> <Link href={'/messages'} ><Badge size='small' count={message.messages.length}>{t('messages')}</Badge></Link> </li>
           
            <li><Link href={'/'} >{t('groups')}</Link></li>
            <li><Link href={'/'} >{t('music')}</Link></li>
            <li><Link href={'/'} >{t('videos')}</Link></li>
        </ul>
    </nav>
  )
}
