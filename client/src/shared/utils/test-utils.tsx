import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import ReduxToolkitProvider from '../providers/reduxToolkit';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';





const locale = 'ru'
const messages = require(`../../shared/messages/${locale}.json`)



export const AllTheProviders = ({ children}: {children: ReactNode}) => {
  return <ReduxToolkitProvider>
    <AntdRegistry>
      <ThemeProvider>
        <NextIntlClientProvider locale={locale} messages={messages} >
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </AntdRegistry>
  </ReduxToolkitProvider>

  }


const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react';
export { customRender as render };