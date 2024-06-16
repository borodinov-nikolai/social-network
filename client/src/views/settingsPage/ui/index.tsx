'use client'
import React, { useEffect } from 'react'
import styles from './SettingsPage.module.scss'
import { Controller, set, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input, Upload } from 'antd'
import { useGetMeQuery } from '@/entities/user'


export const SettingsPage = () => {
  const {data: user} = useGetMeQuery()
  const {control, handleSubmit, setValue, watch} = useForm({
    defaultValues: {
      login: '',
      email: '',
      image: {}
    }
  })

  const {login, email} = user || {}
  
  useEffect(()=> {
      login && setValue('login', login)
      email && setValue('email', email)
  }, [login, email])

  const onSubmit: SubmitHandler<any> = (data)=> {

  }

  console.log(watch('image'))

  return (
    <div>
      <h1>Изменить личные данные</h1>
       <form onSubmit={handleSubmit(onSubmit)}>
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
           name='image'
           control={control}
           render={({field})=> 
          <Upload onChange={(e)=>field.onChange(e.file.originFileObj)} > <Button>Загрузить аватар</Button> </Upload>
          }
           />
        </div>

       </form>
    </div>
  )
}
