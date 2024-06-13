import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import ReduxToolkitProvider from '../providers/reduxToolkit'


const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    
          <ReduxToolkitProvider>
              {children}
 
        </ReduxToolkitProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}