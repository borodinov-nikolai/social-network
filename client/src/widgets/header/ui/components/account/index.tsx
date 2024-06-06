'use client'
import React from 'react'
import { MdAccountCircle } from 'react-icons/md'
import styles from './Account.module.scss'
import { useSignOutMutation } from '@/entities/auth'
import { useAppDispatch } from '@/shared/hooks/reduxToolkit'
import { emptySplitApi } from '@/shared/configs/rtkBase'





const Account = () => {
  const dispatch = useAppDispatch()
    const [signOut] = useSignOutMutation()
    

    const handleSignOut = ()=> {
         signOut()
         localStorage.removeItem('jwt')
         dispatch(emptySplitApi.util.resetApiState())
    }

  return (
    <>
      <div onClick={handleSignOut}  className={styles.root} ><MdAccountCircle /></div>
    </>
  )
}

export default Account