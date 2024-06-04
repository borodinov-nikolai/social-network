import React, { FC } from 'react'
import styles from './SignUpForm.module.scss'
import { Control, Controller, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'
import { Button, Input } from 'antd'
import { ISignUpDto } from '@/entities/auth'


interface IProps {
    handleSubmit: UseFormHandleSubmit<{
        login: string;
        email: string;
        password: string;
    }, undefined>
    onSubmit: SubmitHandler<ISignUpDto>,
    control:  Control<{
        login: string;
        email: string;
        password: string;
    }, any>
}

const SignUpForm: FC<IProps> = ({handleSubmit, onSubmit, control}) => {


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.root} action="">
      
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
  )
}

export default SignUpForm