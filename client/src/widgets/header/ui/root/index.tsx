'use client'
import React from 'react'
import styles from './Header.module.scss'
import { Authorization } from '@/widgets/authorization'
import { useGetMeQuery } from '@/entities/user'
import Account from '../components/account'
import ThemeSwitch from '../components/themeSwitch'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/navigation'
import { useParams } from 'next/navigation'




export const Header = () => {
    const router = useRouter()
    const { data: user, isLoading } = useGetMeQuery()
    const t = useTranslations('header')
    const locale = useLocale()
    const pathname = usePathname()
    const params = useParams()
    
    const onLocaleChange = (e:React.ChangeEvent<HTMLSelectElement>)=> {
        const lang = e.target.value
        router.push(
            // @ts-expect-error
            {pathname, params}, {locale: lang})
    }


   
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
                        {user && <p>{user.login}</p>}
                        {!isLoading && <div className={styles.account} >{user ? <Account /> : <Authorization />}</div>}
                        <ThemeSwitch />
                        <div  >
                            <select onChange={onLocaleChange} value={locale} name="locale" id="">
                                <option value="ru">ru</option>
                                <option value="en">en</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
