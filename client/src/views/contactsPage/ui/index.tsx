import React from 'react'
import styles from './ContactsPage.module.scss'
import { Input } from 'antd'


export const ContactsPage = () => {
  return (
    <div className={styles.root} >
      <div className={styles.search} >
        <label htmlFor="">Поиск контактов</label>
        <Input/>
      </div>
    </div>
  )
}
