'use client'
import React from 'react'
import styles from './FeedPage.module.scss'
import { Button } from 'antd'
import { Link } from '@/navigation'
import { useGetAllPostsQuery } from '@/entities/post'



export const FeedPage = () => {
  const {data: posts} = useGetAllPostsQuery()
  console.log(posts)
  return (
    <div className={styles.root} >
        <div className='container' >
          <div className={styles.shareBtnHolder} ><Link href={'feed/add-post'} ><Button type='primary' >Поделится</Button></Link></div>
          <ul className={styles.postsList} >
            {posts?.map(({id, title, text, user})=> 
            <li key={id}>
               <h3>{title}</h3>
               <div className={styles.imageHolder} >
                
               </div>
            </li>
            )}
          </ul>
        </div>
    </div>
  )
}
