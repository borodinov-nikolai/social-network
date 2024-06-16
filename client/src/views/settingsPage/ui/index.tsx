'use client'
import React, { useEffect } from 'react'
import styles from './SettingsPage.module.scss'
import { Controller,SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input, Upload } from 'antd'
import { useGetMeQuery } from '@/entities/user'


export const SettingsPage = () => {
  const {data: user} = useGetMeQuery()
  const {control, handleSubmit, setValue, watch} = useForm({
    defaultValues: {
      login: '',
      email: '',
      avatar: {}
    }
  })

  const {login, email} = user || {}
  
  useEffect(()=> {
      login && setValue('login', login)
      email && setValue('email', email)
  }, [login, email])

  const onSubmit: SubmitHandler<any> = (data)=> {

  }

  console.log(watch('avatar'))

  return (
    <div className={styles.root} >
      <h1 className={styles.title} >Изменить личные данные</h1>
       <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formItem} >
          <label htmlFor="">Логин</label>
           <Controller
           name='login'
           control={control}
           render={({field})=> 
          <Input {...field} defaultValue={login} />
          }
           />
        </div>

        <div className={styles.formItem} >
          <label htmlFor="">Email</label>
           <Controller
           name='email'
           control={control}
           render={({field})=> 
          <Input {...field} defaultValue={login} />
          }
           />
        </div>

        <div className={styles.formItem} >
          <label htmlFor="">Аватар</label>
           <Controller
           name='avatar'
           control={control}
           render={({field})=> 
          <Upload listType="picture-card" maxCount={1} onChange={(e)=>field.onChange(e.file.originFileObj)} > Выбрать файл </Upload>
          }
           />
        </div>

        <div className={styles.submitBtnHolder} > <Button htmlType='submit'  type='primary' >Сохранить</Button>  </div>

       </form>
    </div>
  )
}
