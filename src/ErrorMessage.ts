import { defineComponent, h } from 'vue'
import { useFormContext } from './useFormContext'
import { PropType, computed } from '@vue/runtime-core'
import { FormState, InjectionKey } from './types'
import { defaultInjectionKey } from './constants'

export const ErrorMessage = defineComponent({
  name: 'ErrorMessage',
  props: {
    name: {
      type: String,
      required: true,
    },
    formState: {
      type: Object as PropType<FormState>,
    },
    injectionKey: {
      type: [String, Symbol] as PropType<InjectionKey>,
      default: defaultInjectionKey,
    },
  },
  setup(props) {
    const usableFormState = computed(() =>
      props.formState
        ? props.formState
        : useFormContext(props.injectionKey).formState
    )
    return () => {
      const error = usableFormState.value.errors[props.name]
      return error ? h('span', error) : null
    }
  },
})
