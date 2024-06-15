import React from 'react';
import { Header } from "."
import { render, screen } from '@/shared/testing/utils/test-utils';
import { mockedUseRouter } from '../../../../../jest.setup';




describe('header', ()=> {
    beforeEach(() => {
        mockedUseRouter({
          push: jest.fn(),
          replace: jest.fn(),
          refresh: jest.fn(),
        });
      });
    test('test',  ()=> {
         render(<Header/>, undefined)
         
        expect(screen.getByText('Социальная сеть')).toBeInTheDocument()
    
    })
})
