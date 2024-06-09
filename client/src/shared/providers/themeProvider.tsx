'use client'
import React, { ReactNode } from 'react'
import { useAppSelector } from '../hooks/reduxToolkit'
import { themeSelector } from '@/entities/theme'
import cs from 'classnames'
import { NextFont } from 'next/dist/compiled/@next/font'


const ThemeProvider = ({children, font}:{children: ReactNode, font?: NextFont}) => {
  const theme = useAppSelector(themeSelector)
  return (
    <body className={cs(font?.className, theme)} >
        {children}
    </body>
  )
}

export default ThemeProvider