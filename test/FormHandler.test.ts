import FormHandler from '../src/FormHandler'
import {mount} from '@vue/test-utils'
import { expect, it, describe } from "vitest"

describe('FormHandler component testing', () => {
    it('Form handler gets mounted', () => {
        expect(FormHandler).toBeTruthy();

        const wrapper = mount(FormHandler)

        console.log({wrapper})
        expect(wrapper)
    })
})