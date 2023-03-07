import { FormHandler } from '../FormHandler'
import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'

describe('FormHandler component testing', () => {
  it('Form handler gets mounted', () => {
    expect(FormHandler).toBeTruthy()

    const wrapper = mount(FormHandler)
    expect(wrapper.exists()).toBeTruthy()
  })
  it('Form handler scoped slot provides values and form state', () => {
    expect(FormHandler).toBeTruthy()

    const wrapper = mount(FormHandler, {
      slots: {
        default: `<template #default="props">
                    {{props}}
                    </template>
                `,
      },
    })
    expect(wrapper.html()).toContain('values')
    expect(wrapper.html()).toContain('formState')
  })
  it('Form handler is correctly initialized', () => {
    const initialValues = {
      field1: 'something',
      field2: 'some other thing',
    }
    const wrapper = mount(FormHandler, {
      props: {
        initialValues,
      },
      slots: {
        default: `<template #default="props">
                    {{props}}
                    </template>
                `,
      },
    })
    expect(JSON.parse(wrapper.html())?.values).toStrictEqual(initialValues)
  })
})
