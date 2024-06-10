'use client'
import { usePathname, useRouter } from '@/navigation'
import { useLocale } from 'next-intl'
import { useParams} from 'next/navigation'
import React from 'react'
import styles from './LocaleSwitch.module.scss'


const LocaleSwitch = () => {
    const router = useRouter()
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
    <div className={styles.root}>
    <select onChange={onLocaleChange} value={locale} name="locale" id="">
        <option value="ru">ru</option>
        <option value="en">en</option>
    </select>
</div>
  )
}

export default LocaleSwitch