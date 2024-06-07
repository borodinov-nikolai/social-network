'use client'
import { useGetMessageQuery } from '@/entities/message'
import React from 'react'
import styles from './HomePage.module.scss'


export const HomePage = () => {
    const {data} = useGetMessageQuery()
    console.log(data?.message)
  return (
    <main className={styles.root} >
        <div className='container' >
            <div className={styles.inner} >
            <p>{data?.message}</p>
            </div>
        </div>
    </main>
  )
}
