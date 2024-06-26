'use client'
import React, { useState } from 'react'
import styles from './AddPostPage.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { IAddPostDto, useAddPostMutation } from '@/entities/post'
import { useRouter } from '@/navigation'
import { useGetMeQuery } from '@/entities/user'



export const AddPostPage = () => {
  const {data: user} = useGetMeQuery()
  const router = useRouter()
  const [file, setFile] = useState<any[]>([])
  const {control, handleSubmit} = useForm({
    defaultValues: {
      title: '',
      image:{} as FileList,
      text: ''
    }
  })
  const [addPost] = useAddPostMutation()
  

  const onSubmit: SubmitHandler<IAddPostDto> = async (data) => {
    const {title, text, image} = data
    let formData = new FormData()
    formData.append('userId', String(user?.id))
    formData.append('title', title)
    formData.append('text', text)
    formData.append('image', file[0].originFileObj)
    addPost(formData)
    router.push('/feed')
  }
  
  return (
    <div className={styles.root} >
    <div className={styles.inner} >
      <h1 className={styles.title} >Чем хотите поделиться?</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="">
        <div className={styles.formItem} >
          <label htmlFor="">Заголовок</label>
          <Controller
          name={'title'}
          control={control}
          render={({field})=>
          <Input {...field} />
          }
          />
        </div>
        <div className={styles.formItem} >
          <label htmlFor="">Картинка</label>
          <Controller
          name={'image'}
          control={control}
          render={({field})=>
          <Upload listType="picture-card" maxCount={1} onChange={(e)=> setFile(e.fileList)}>
            Выбрать файл
          </Upload>
          }
          />
        </div>
        <div className={styles.formItem} >
          <label htmlFor="">Текст</label>
          <Controller
          name={'text'}
          control={control}
          render={({field})=>
          <TextArea rows={10} {...field} />
          }
          />
        </div>
        <div className={styles.submitBtnHolder} > <Button htmlType='submit' type='primary' >Опубликовать</Button> </div>
      </form>
    </div>
    </div>
  )
}
