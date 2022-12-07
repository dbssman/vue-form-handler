import { ModifiedValues } from './types';
import { FormHandlerParams, FormState, FormHandlerReturn, BaseProps, HandleSubmit, KeyValueFn, KeyFn, Register } from './types';
import { reactive, readonly } from 'vue'
import {isEqual} from 'lodash-es'

//TODO: check if interesting to have or not
const initState = (initialValues = {}) =>
  Object.keys(initialValues).reduce((accumulator: any, current: string) => {
    accumulator[current] = false
    return accumulator
  }, {})

export const useFormHandler: (_:FormHandlerParams) => FormHandlerReturn = ({ 
  initialValues = {}, 
  interceptor = () => true, 
  validate = () => true 
}) => {

  //TODO: proper initializer
  const values = reactive<any>({ ...initialValues })

  //TODO: formState initializer?
  const formState = reactive<FormState>({
    touched: {},
    dirty: {},
    errors: {},
    isDirty: false,
    isTouched: false,
    isValid: true,
  })

  const register:Register = (name, {native} = {}) => ({
   name,
   modelValue: values[name],
   ...(native !== false && {value: values[name]}),
   ...(native !== false && {onInput: (el:any) => handleChange(name,el && (el.target && el.target.value))}),
   'onUpdate:modelValue': (value:any) => handleChange(name,value),
   onBlur: () => handleBlur(name)
  })

  const setDirtyState:KeyValueFn = (key, value) => {
    if(formState.dirty[key] !== value){
      formState.dirty[key] = value
      formState.isDirty = value || Object.values(formState.dirty).some(Boolean)
    }
  }

  const setTouchedState:KeyValueFn = (key:string, value:boolean) => {
    if(formState.touched[key] !== value){
      formState.touched[key] = value
      formState.isTouched = value || Object.values(formState.touched).some(Boolean)
    }
  }

  const setValue = (key: string, value: any = null) => {
    if (interceptor()) {
      values[key] = value
      setDirtyState(key, !isEqual(value, initialValues[key]))
    }
  }

  const handleBlur:KeyFn = (key) => {
    setTouchedState(key,true)
  }

  const handleChange:KeyValueFn = (key, value = null) => {
    setValue(key, value)
    setTouchedState(key,true)
  }

  const resetField:KeyValueFn = (key, initial = false) => {
    setValue(key, initial ? initialValues[key] : null)
    setDirtyState(key,false)
    setTouchedState(key,false)
  }

  const resetForm = (initial = false) => {
    Object.keys(values).forEach((key)=>{
      resetField(key, initial)
    })
  }

  const handleSubmit:HandleSubmit = (successFn, {full, diff}) => {
    if(validate){
      successFn(diff 
        ? modifiedValues() 
        : values,
        full && !diff && modifiedValues());
    }
  }

  const modifiedValues:ModifiedValues = () => {
    return Object.fromEntries(Object.entries(values).filter(([key]) => formState.dirty[key]))
  }

  return {
    values: readonly(values),
    formState,
    register,
    setValue,
    modifiedValues,
    resetField,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
  }
}
