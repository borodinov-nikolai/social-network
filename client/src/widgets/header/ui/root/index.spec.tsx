import React from 'react';
import { Header } from "."
import { NextIntlClientProvider } from 'next-intl';
import ReduxToolkitProvider from '@/shared/providers/reduxToolkit';
import { render, screen } from '@/shared/utils/test-utils';
import * as nextRouter from 'next/router';




describe('header', ()=> {
 

    test('test',  ()=> {
         render(<Header/>, undefined)
         
        expect(screen.getByText('Социальная сеть')).toBeInTheDocument()
    
    })
})
