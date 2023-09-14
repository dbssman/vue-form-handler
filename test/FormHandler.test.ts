import FormHandler from '@/FormHandler.vue'
import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'

describe('FormHandler', () => {
  it('should mount', () => {
    expect(FormHandler).toBeTruthy()

    const wrapper = mount(FormHandler)
    expect(wrapper.exists()).toBeTruthy()
  })
  it('should provide values and formState', () => {
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
  it('should be properly initialized', () => {
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
