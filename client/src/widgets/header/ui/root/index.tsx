'use client'
import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { Authorization } from '@/widgets/authorization'
import { useGetMeQuery } from '@/entities/user'
import Account from '../components/account'
import ThemeSwitch from '../components/themeSwitch'



export const Header = () => {
    const {data: user, isLoading} = useGetMeQuery()
 
    


  return (
    <header className={styles.root} >
        <div className="container">
            <div className={styles.inner} >
                <div className={styles.logo} >
                    <Link href={'/'} >logo</Link>
                </div>
                <nav>
                    <ul className={styles.navigation} >
                        <li><Link href={'#'} >ссылка</Link></li>
                    </ul>
                </nav>
                <div className={styles.icons} >
                    {user && <p>{user.login}</p> }
                    {!isLoading && <div className={styles.account} >{user ? <Account/> : <Authorization/>}</div>}
                    <ThemeSwitch/>
                </div>
            </div>
        </div>
    </header>
  )
}
