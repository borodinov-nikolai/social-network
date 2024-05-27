'use client'
import React, { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import styles from './Account.module.scss'
import { Button, ConfigProvider, Input, Modal } from 'antd'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSignUpMutation } from '@/entities/auth'



interface IFields {
  email: string
  password: string
}


const Account = () => {
  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [signUp] = useSignUpMutation()

  const onSubmit: SubmitHandler<IFields> = (data) => {
    if (data) {
    signUp(data)
    setIsOpen(false)
    }

  }
console.log(watch('email'))
  return (
    <>
      <div onClick={() => setIsOpen(true)} className={styles.root} ><MdAccountCircle /></div>
  
        <Modal footer={false} className={styles.modal} title='Авторизация' open={isOpen} onCancel={() => setIsOpen(false)} >
    
        </Modal>

    </>
  )
}

export default Account