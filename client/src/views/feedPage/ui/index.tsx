import React from 'react'
import styles from './FeedPage.module.scss'
import { Button } from 'antd'
import { Link } from '@/navigation'
import Image from 'next/image'
import { imageUrl } from '@/entities/image'
import { getPosts } from '@/entities/post'



export const FeedPage = async () => {
  const posts = await getPosts()
 
  return (
    <div className={styles.root} >
        <div className='container' >
          <div className={styles.shareBtnHolder} ><Link href={'feed/add-post'} ><Button type='primary' >Поделиться</Button></Link></div>
          <ul className={styles.postsList} >
            {posts?.map(({id, title, text, user, image, date})=>{
              const splitedDate = date.split('T')
              const day = splitedDate[0]
              const time = splitedDate[1].slice(0,8) 
            return <li className={styles.post} key={id}>
               <h3>{title}</h3>
               <div className={styles.imageHolder} >
                 <Image src={imageUrl + image} width={500} height={250} alt='post image' />
               </div>
               <p className={styles.text} >{text}</p>
               <div className={styles.post_footer}>
                 <p>{day} {time}</p>
                 <p>Автор: {user.login}</p>
               </div>
            </li>}
            )}
          </ul>
        </div>
    </div>
  )
}
