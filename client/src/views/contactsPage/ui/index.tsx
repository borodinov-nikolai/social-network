'use client'
import React, { useRef, useState } from 'react'
import styles from './ContactsPage.module.scss'
import {Avatar, Input } from 'antd'
import { useGetAllUsersQuery, useGetMeQuery } from '@/entities/user'
import { imageUrl } from '@/entities/image'
import { MdAccountCircle, MdOutlineMessage } from 'react-icons/md'
import { IoPersonAddOutline } from 'react-icons/io5'
import { useAddContactMutation } from '@/entities/contact'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { Link } from '@/navigation'




export const ContactsPage = () => {
  const [search, setSearch] = useState<string>('')
  const [showSearhResult, setShowSearchResult] = useState<boolean>(false)
  const {data:user} = useGetMeQuery()
  const {data:users} = useGetAllUsersQuery({search})
  const [addContact] = useAddContactMutation()
  const ref = useClickOutside(()=>setShowSearchResult(false))

  
  

  const handleInputChange = (value: string)=> {
        setSearch(value)
  }

   
 console.log(users)

  return (
    <div className={styles.root} >
      <div ref={ref} className={styles.search} >
        <label htmlFor="">Поиск контактов</label>
        <Input onClick={()=> setShowSearchResult(true)} onChange={(e)=> handleInputChange(e.target.value)}  />
        {showSearhResult && <div onBlur={()=> setShowSearchResult(false)} className={styles.searchResult} >
        <ul className={styles.usersList} >
          {
            users?.map(({id, login, avatar})=> {
              return <li className={styles.userCard} key={id} >
                 <Avatar src={imageUrl + avatar} className={styles.avatar} size={50} icon={<MdAccountCircle/>} />
                <p>{login}</p>
                <div onClick={()=>{addContact({contactId: +id}); setShowSearchResult(false)}} className={styles.addContact} >
                  <IoPersonAddOutline />
                </div>
                </li>
            })
          }
        </ul>
          </div>}
      </div>
      <div>
        <ul className={styles.usersList} >
          {
            user?.contacts?.map((contact)=> {
              const {id, login, avatar} = contact.contact
              return <li  className={styles.userCard} key={id} >
                 <Avatar src={imageUrl + avatar} className={styles.avatar} size={50} icon={<MdAccountCircle/>} />
                <p>{login}</p>
                <div className={styles.addContact} >
                  <Link href={{pathname: '/contacts/chat/[id]', params: {id: id}}}>
                    <MdOutlineMessage />
                  </Link>
                </div>
                </li>
            })
          }
        </ul>
      </div>
    </div>
  )
}
