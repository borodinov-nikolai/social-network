'use client'
import React, { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import styles from './SignUp.module.scss'
import { Button, Input, Modal } from 'antd'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ISignUpDto, useSignUpMutation } from '@/entities/auth'
import { useGetMeQuery } from '@/entities/user'





export const SignUp = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { handleSubmit, watch, control, reset } = useForm({
    defaultValues: {
      login: '',
      email: '',
      password: ''
    }
  })
  const [signUp] = useSignUpMutation()
  const {refetch} = useGetMeQuery(null)

  const onSubmit: SubmitHandler<ISignUpDto> = async (data) => {
    if (data) {
    const res = await signUp(data) 
    if("data" in res && res.data) {
      window.localStorage.setItem('jwt', res.data.jwt)
      refetch()
      reset()
    } else if( 'error' in res) {
      console.error(res.error)
    }
    setIsOpen(false)
    }

  }
   

 

  return (
    <>
      <div onClick={() => setIsOpen(true)} className={styles.root} ><MdAccountCircle /></div>
  
        <Modal footer={false} className={styles.modal} title='Авторизация' open={isOpen} onCancel={() => setIsOpen(false)} >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="">

        <div className={styles.formItem} >
              <label htmlFor={'login'}>Логин</label>
              <Controller
              name='login'
              control={control}
              render={({field})=> 
                <Input {...field} id={'login'}/>
              }
              />

            </div>

            <div className={styles.formItem} >
              <label htmlFor={'email'}>Email</label>
              <Controller
              name='email'
              control={control}
              render={({field})=> 
                <Input {...field} id={'email'}/>
              }
              />

            </div>

            <div className={styles.formItem} >
              <label htmlFor={'password'}>Пароль</label>
              <Controller
              name='password'
              control={control}
              render={({field})=> 
                <Input {...field} id={'password'}/>
              }
              />
            </div>
          <Button onClick={handleSubmit(onSubmit)} className={styles.submitBtn} type='primary' >Отправить</Button>
          </form>
        </Modal>

    </>
  )
}

