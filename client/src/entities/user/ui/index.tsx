'use client'

import React from 'react'
import { useGetMeQuery } from '../api'


export const GetUser = () => {
    const {data: user} = useGetMeQuery()
  return (
    <></>
  )
}
