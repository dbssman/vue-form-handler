import { defineComponent } from '@vue/runtime-core'
import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'
import {
  useFormContext,
  useFormHandler,
  FormHandler,
  InjectionKey,
} from '../index'

describe('useFormContext', () => {
  const registerComponents = (injectionKey?: InjectionKey) => {
    const Child = defineComponent({
      template: `<template>
            {{props}}
            </template>`,
      setup() {
        const props = useFormContext(injectionKey)
        return {
          props,
        }
      },
    })
    const Parent = defineComponent({
      template: `<template>
            <Child></Child>
            </template>`,
      components: { Child },
      setup() {
        useFormHandler({ injectionKey })
      },
    })

    return Parent
  }
  it('should provide values and formState', () => {
    expect(FormHandler).toBeTruthy()
    const Parent = registerComponents()
    const wrapper = mount(Parent, {
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
  it('should work with string injection keys', () => {
    expect(FormHandler).toBeTruthy()
    const Parent = registerComponents('test')
    const wrapper = mount(Parent, {
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
  it('should work with Symbol injection keys', () => {
    expect(FormHandler).toBeTruthy()
    const Parent = registerComponents(Symbol('test'))
    const wrapper = mount(Parent, {
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
})
