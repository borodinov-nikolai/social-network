'use client'
import React from 'react'
import styles from './FeedPage.module.scss'
import { Button } from 'antd'
import { Link } from '@/navigation'



export const FeedPage = () => {

  return (
    <div className={styles.root} >
        <div className='container' >
          <div className={styles.shareBtnHolder} ><Link href={'feed/add-post'} ><Button type='primary' >Поделится</Button></Link></div>
        </div>
    </div>
  )
}
