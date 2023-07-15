import { ComputedRef, Ref } from '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export function unref<T>(ref: T | Ref<T> | ComputedRef<T>): T
}
