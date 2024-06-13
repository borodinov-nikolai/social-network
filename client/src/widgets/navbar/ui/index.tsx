import React from 'react'
import styles from './Navbar.module.scss'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'


export const Navbar = () => {
  const t = useTranslations('navbar')
  return (
    <nav className={styles.root} >
        <ul className={styles.list}>
            <li><Link href={'/'} >{t('lent')}</Link></li>
            <li><Link href={'/contacts'} >{t('contacts')}</Link></li>
            <li><Link href={'/'} >{t('messages')}</Link></li>
            <li><Link href={'/'} >{t('groups')}</Link></li>
            <li><Link href={'/'} >{t('music')}</Link></li>
            <li><Link href={'/'} >{t('videos')}</Link></li>
        </ul>
    </nav>
  )
}
