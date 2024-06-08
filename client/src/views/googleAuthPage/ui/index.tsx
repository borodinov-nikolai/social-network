"use client"
import React, { useEffect } from 'react'
import qs from 'qs'
import { useGoogleOauthMutation } from '@/entities/auth'
import { useRouter } from 'next/navigation'
import { useGetMeQuery } from '@/entities/user'


export const GoogleAuthPage = () => {
  const router = useRouter()
  const [googleOauth] = useGoogleOauthMutation()
  const query = qs.parse(window.location.search.slice(1))
  const {refetch} = useGetMeQuery()
  useEffect(() => {
      (async ()=> {
        try{
          const res = await googleOauth({ code: query.code as string })
          if(res.data) {
            const token = res.data.jwt
            localStorage.setItem('jwt', token)
            router.replace('/')
            refetch()
          }
        } catch(e) {
          console.error(e)
        }
    
    })()
    
  }, [])

  return (
    <></>
  )
}
