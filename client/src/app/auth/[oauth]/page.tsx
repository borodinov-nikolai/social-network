import ReduxToolkitProvider from '@/shared/providers/reduxToolkit'
import { GoogleAuthPage } from '@/views/googleAuthPage'
import React from 'react'



const page = () => {
  return (
    <> 
    <ReduxToolkitProvider>
    <GoogleAuthPage/>
    </ReduxToolkitProvider>
     </>
  )
}

export default page