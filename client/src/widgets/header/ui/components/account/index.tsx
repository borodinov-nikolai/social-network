'use client'
import React, { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import styles from './Account.module.scss'
import { useSignOutMutation } from '@/entities/auth'
import { useAppDispatch } from '@/shared/hooks/reduxToolkit'
import { emptySplitApi } from '@/shared/configs/rtkBase'
import { Link } from '@/navigation'
import { Avatar, Button } from 'antd'
import { useGetMeQuery } from '@/entities/user'
import { imageUrl } from '@/entities/image'





const Account = () => {
  const {data: user} = useGetMeQuery()
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const dispatch = useAppDispatch()
    const [signOut] = useSignOutMutation()
    

    const handleSignOut = ()=> {
         signOut()
         localStorage.removeItem('jwt')
         dispatch(emptySplitApi.util.resetApiState())
    }

  return (
    <>
      <div className={styles.root} >
        <div onClick={ ()=>setShowDropdown(!showDropdown) } >
        <Avatar src={imageUrl + user?.avatar} size={35} icon={<MdAccountCircle />} />
        
      </div>
      {showDropdown && <div className={styles.dropdown} >
          <Link onClick={()=> setShowDropdown(false)} className={styles.settingsLink} href='/settings' >Настройки</Link>
        <Button className={styles.signOutBtn} onClick={handleSignOut} >Выйти из аккаунта</Button>
        </div>}
      </div> 
     
    </>
  )
}

export default Account