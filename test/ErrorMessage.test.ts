import { defineComponent } from '@vue/runtime-core'
import ErrorMessage from '@/ErrorMessage.vue'
import { useFormHandler } from '@/useFormHandler'
import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'

describe('ErrorMessage', () => {
  it('should mount', () => {
    expect(ErrorMessage).toBeTruthy()

    const { formState } = useFormHandler()
    const wrapper = mount(ErrorMessage, {
      props: {
        name: 'test',
        formState,
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })
  it('should render nothing when no error', () => {
    const { register, formState } = useFormHandler()
    register('field')
    const wrapper = mount(ErrorMessage, {
      props: {
        name: 'field',
        formState,
      },
    })
    expect(wrapper.html()).toBe('<!--v-if-->')
  })
  it('should render error when error', async () => {
    const { register, formState, setError } = useFormHandler()
    register('field')
    setError('field', 'some error')
    const wrapper = mount(ErrorMessage, {
      props: {
        name: 'field',
        formState,
      },
    })
    expect(wrapper.html()).toBe('<span>some error</span>')
  })
  it('should work with context', async () => {
    const TestComponent = defineComponent({
      template: `
          <ErrorMessage name="hello" />
          `,
      components: {
        ErrorMessage,
      },
      setup: () => {
        useFormHandler()
      },
    })
    const wrapper = mount(TestComponent)
    expect(wrapper.html()).toBe('<!--v-if-->')
  })
  it('should work with context and error', async () => {
    const TestComponent = defineComponent({
      template: `
          <ErrorMessage name="hello" />
          `,
      components: {
        ErrorMessage,
      },
      setup: () => {
        const { setError } = useFormHandler()
        setError('hello', 'some error')
      },
    })
    const wrapper = mount(TestComponent)
    expect(wrapper.html()).toBe('<span>some error</span>')
  })
  it('should work with injection key', async () => {
    const TestComponent = defineComponent({
      template: `
          <ErrorMessage name="hello" :injectionKey="injectionKey" />
          `,
      components: {
        ErrorMessage,
      },
      setup: () => {
        const injectionKey = Symbol('test')
        useFormHandler({
          injectionKey,
        })
        return {
          injectionKey,
        }
      },
    })
    const wrapper = mount(TestComponent)
    expect(wrapper.html()).toBe('<!--v-if-->')
  })
  it('should work with injection key and error', async () => {
    const TestComponent = defineComponent({
      template: `
            <ErrorMessage name="hello" :injectionKey="injectionKey" />
            `,
      components: {
        ErrorMessage,
      },
      setup: () => {
        const injectionKey = Symbol('test')
        const { setError } = useFormHandler({
          injectionKey,
        })
        setError('hello', 'some error')
        return {
          injectionKey,
        }
      },
    })
    const wrapper = mount(TestComponent)
    expect(wrapper.html()).toBe('<span>some error</span>')
  })
})
