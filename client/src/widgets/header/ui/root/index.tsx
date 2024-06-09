'use client'
import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { Authorization } from '@/widgets/authorization'
import { useGetMeQuery } from '@/entities/user'
import Account from '../components/account'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxToolkit'
import { themeSelector, toggleTheme } from '@/entities/theme'
import { CiLight } from 'react-icons/ci'
import cs from 'classnames'
import { MdDarkMode } from 'react-icons/md'



export const Header = () => {
    const dispatch = useAppDispatch()
    const {data: user, isLoading} = useGetMeQuery()
    const theme = useAppSelector(themeSelector)

    


  return (
    <header className={cs(styles.root, styles[theme])} >
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
                    <div onClick={()=> dispatch(toggleTheme())} className={styles.themeToggle} >{theme === 'dark-theme' ? <CiLight/>: <MdDarkMode/> }</div>
                </div>
            </div>
        </div>
    </header>
  )
}
