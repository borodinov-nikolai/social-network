'use client'
import React, { useState } from 'react'
import styles from './Authorization.module.scss'
import { ISignInDto, ISignUpDto, useSignInMutation, useSignUpMutation } from '@/entities/auth'
import { useGetMeQuery } from '@/entities/user'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Modal } from 'antd'
import SignUpForm from '../components/signUpForm'
import SignInForm from '../components/signInForm'
import { PiSignIn } from 'react-icons/pi'


export const Authorization = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      login: '',
      email: '',
      password: ''
    }
  })
  const [signUp] = useSignUpMutation()
  const [signIn] = useSignInMutation()
  const { refetch } = useGetMeQuery()

  const onSubmit: SubmitHandler<ISignUpDto | ISignInDto> = async (data) => {
    if (data) {

      const res = isSignUp ? await signUp(data as ISignUpDto) : await signIn(data as ISignInDto)
      if ("data" in res && res.data) {
        window.localStorage.setItem('jwt', res.data.jwt)
        refetch()
        reset()
      } else if ('error' in res) {
        console.error(res.error)
      }
      setIsOpen(false)
    }

  }




  return (
    <>
      <div onClick={() => setIsOpen(true)} className={styles.root} ><PiSignIn /></div>

      <Modal footer={false} className={styles.modal} title={isSignUp ? 'Регистрация' : 'Авторизация'} open={isOpen} onCancel={() => setIsOpen(false)} >
        {!isSignUp && <SignInForm handleSubmit={handleSubmit} control={control} onSubmit={onSubmit} />}
        {isSignUp && <SignUpForm handleSubmit={handleSubmit} control={control} onSubmit={onSubmit} />}
        {!isSignUp && <p className={styles.formSwitch} >Нет аккаунта? <span onClick={() => setIsSignUp(true)} >регистрация</span></p>}
        {isSignUp && <p className={styles.formSwitch} >Есть аккаунт? <span onClick={() => setIsSignUp(false)} >авторизация</span></p>}
      </Modal>

    </>
  )
}


