'use client'
import React from 'react'
import styles from './Header.module.scss'
import { Authorization } from '@/widgets/authorization'
import { useGetMeQuery } from '@/entities/user'
import Account from '../components/account'
import ThemeSwitch from '../components/themeSwitch'
import { useTranslations } from 'next-intl'
import { Link} from '@/navigation'
import LocaleSwitch from '../components/localeSwitch'





export const Header = () => {
    const { data: user, isLoading } = useGetMeQuery()
    const t = useTranslations('header')
  


   
    return (
        <header className={styles.root} >
            <div className="container">
                <div className={styles.inner} >
                    <div className={styles.logo} >
                        <Link href={'/'} >logo</Link>
                    </div>
                    <nav>
                        <ul className={styles.navigation} >
                            <li><Link href={'#'} >{t('title')}</Link></li>
                        </ul>
                    </nav>
                    <div className={styles.icons} >
                        <LocaleSwitch/>
                        <ThemeSwitch />
                        {!isLoading && <div className={styles.account} >{user ? <Account /> : <Authorization />}</div>}
                    </div>
                </div>
            </div>
        </header>
    )
}
