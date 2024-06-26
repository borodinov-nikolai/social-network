'use client'
import React, { useEffect, useState} from 'react'
import styles from './SettingsPage.module.scss'
import { Controller,SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input, Upload } from 'antd'
import { IUserUpdateDto, useGetMeQuery, useUpdateMeMutation } from '@/entities/user'
import { imageUrl } from '@/entities/image'
import { useTranslations } from 'next-intl'



export const SettingsPage = () => {
  const t = useTranslations('profile')
  const [fileList, setFileList] = useState<any | undefined>()
  const {data: user} = useGetMeQuery()
  const [updateMe, {isLoading}] = useUpdateMeMutation()
  const {control, handleSubmit, setValue, watch} = useForm({
    defaultValues: {
      login: '',
      email: '',
      avatar: {} as Blob
    }
  })

  const {login, email, avatar} = user || {}
  
  useEffect(()=> {
      login && setValue('login', login)
      email && setValue('email', email)
  }, [login, email])

  useEffect(()=> {
      avatar && setFileList([
        {
          uid: '1',
          name: 'preview',
          status: 'done',
          url: imageUrl + avatar,
        }
      ])
  }, [avatar])






  const onSubmit: SubmitHandler<IUserUpdateDto> = (data)=> {
    const {login, email, avatar} = data
    const formData = new FormData
    login && formData.append('login', login)
    email && formData.append('email', email)
    avatar && formData.append('avatar', avatar)
    updateMe(formData)

  }



  return (
    <div className={styles.root} >
      <h1 className={styles.title} >{t('title')}</h1>
       <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formItem} >
          <label htmlFor="">{t('login')}</label>
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
          <label htmlFor="">{t('avatar')}</label>
           <Controller
           name='avatar'
           control={control}
           render={({field})=> 
          <Upload 
            fileList={fileList}
            listType="picture-card" maxCount={1} onChange={(e)=>{field.onChange(e.file.originFileObj); setFileList(e.fileList)}} >{t('change file')}</Upload>
          }
           />
        </div>

        <div className={styles.submitBtnHolder} > <Button htmlType='submit'  type='primary' >{t('save')}</Button>  </div>

       </form>
    </div>
  )
}
