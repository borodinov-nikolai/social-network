'use client'
import React from 'react'
import styles from './AddPostBtn.module.scss'
import { Link } from '@/navigation'
import { Button } from 'antd'
import { useGetMeQuery } from '@/entities/user'



export const AddPostBtn = () => {
    const {data:user} = useGetMeQuery()
    if(user) {
        return (
            <div className={styles.root} ><Link href={'feed/add-post'} ><Button type='primary' >Поделиться</Button></Link></div>
          )
    }
 
}
