'use client'
import React from 'react'
import styles from './AddPostPage.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'


export const AddPostPage = () => {
  const {control, watch} = useForm({
    defaultValues: {
      title: '',
      image: {},
      text: ''
    }
  })
  return (
    <div className={styles.root} >
    <div className={styles.inner} >
      <h1 className={styles.title} >Чем хотите поделиться?</h1>
      <form className={styles.form} action="">
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
          <Upload {...field}>
            <Button>Загрузить</Button>
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
        <div className={styles.submitBtnHolder} > <Button type='primary' >Опубликовать</Button> </div>
      </form>
    </div>
    </div>
  )
}
