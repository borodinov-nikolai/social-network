'use client'
import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import Account from '../components/account'


export const Header = () => {
  return (
    <div className={styles.header} >
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
                    <div className={styles.account} ><Account/></div>
                </div>
            </div>
        </div>
    </div>
  )
}
