'use client'
import React from 'react'
import { MdAccountCircle } from 'react-icons/md'
import styles from './Account.module.scss'
import { useSignOutMutation } from '@/entities/auth'
import { useGetMeQuery } from '@/entities/user'





const Account = () => {
    const [signOut] = useSignOutMutation()
    const {refetch} = useGetMeQuery()

    const handleSignOut = ()=> {
         signOut()
         localStorage.removeItem('jwt')
         refetch()
    }

  return (
    <>
      <div onClick={handleSignOut}  className={styles.root} ><MdAccountCircle /></div>
    </>
  )
}

export default Account