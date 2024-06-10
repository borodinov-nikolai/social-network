import {HomePage, sum} from './index'
import {describe, expect, test} from '@jest/globals';
import {render, screen} from '@testing-library/react'

describe('sum module', ()=> {
    test('adds 1 + 3 to equal 3', ()=> {
        expect(sum(1, 2)).toBe(3)
    }),
    test('render html', ()=> {
       
    })
})