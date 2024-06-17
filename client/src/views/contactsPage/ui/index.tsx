'use client'
import React from 'react'
import styles from './ContactsPage.module.scss'
import {Avatar, Input } from 'antd'
import { useGetAllUsersQuery } from '@/entities/user'
import { imageUrl } from '@/entities/image'
import Image from 'next/image'
import { MdAccountCircle } from 'react-icons/md'
import { IoPersonAddOutline } from 'react-icons/io5'


export const ContactsPage = () => {
  const {data: users} = useGetAllUsersQuery()
  return (
    <div className={styles.root} >
      <div className={styles.search} >
        <label htmlFor="">Поиск контактов</label>
        <Input/>
      </div>
      <div>
        <ul className={styles.usersList} >
          {
            users?.map(({id, login, avatar})=> {
              
              return <li className={styles.userCard} key={id} >
                 <Avatar src={imageUrl + avatar} className={styles.avatar} size={50} icon={<MdAccountCircle/>} />
                <p>{login}</p>
                <div className={styles.addContact} >
                  <IoPersonAddOutline />
                </div>
                </li>
            })
          }
        </ul>
      </div>
    </div>
  )
}
