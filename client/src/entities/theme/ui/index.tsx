'use client'
import { useAppDispatch } from '@/shared/hooks/reduxToolkit'
import React, { useEffect } from 'react'
import { setTheme } from '../store/slice'

export const LoadTheme = () => {
    const dispatch = useAppDispatch()
    useEffect(()=> {
        const loadedTheme = localStorage.getItem('theme')
        if(loadedTheme) {
            dispatch(setTheme(loadedTheme))
        }
    }, [])
  return (
    <></>
  )
}
