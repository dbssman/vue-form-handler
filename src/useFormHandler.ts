import { ModifiedValues, TriggerValidation, Validations, FormHandler, ResetField, ResetForm, InitFieldState, SetError, ClearErrors, SetValue, ClearField } from './types';
import { FormState, HandleSubmit, KeyValueFn, KeyFn, Register } from './types';
import { reactive, readonly, watch } from 'vue'
import {isEqual} from 'lodash-es'
//TODO: unify key-name
//TODO: separate synchronous from asynchronous validations
export const useFormHandler:FormHandler = ({ 
  initialValues = {}, 
  interceptor = async () => true, 
  validate,
  options = { validationBehaviour: 'always', validationErrors: 'first' }
} = {}) => {
  const values:Record<string,any> = reactive({ ...initialValues })
  const formState = reactive<FormState>({
    touched: {},
    dirty: {},
    errors: {},
    isDirty: false,
    isTouched: false,
    isValid: true,
  })

  let validations:Record<string,Validations> = {}
  let defaultValues:Record<string,any> = {}

  const initFieldState:InitFieldState = (name, options) => {
    validations = {
      ...validations,
      [name]: options.validations || {}
    }
    defaultValues = {
      ...defaultValues,
      [name]: options.defaultValue
    }
    if(Object.keys(initialValues).includes(name) 
    || values[name] !== undefined){
      return
    }
    values[name] = options.defaultValue ?? null
  }

  const register:Register = (name, options = {}) => {
    initFieldState(name,options);
    return({
      name,
      errors: Object.values(formState.errors[name] || {}) || [],
      onBlur: () => handleBlur(name),
      ...(options.withDetails && {
        isDirty: !!formState.dirty[name],
        isTouched: !!formState.touched[name],
      }),
      ...(options.native !== true && {
        modelValue: values[name],
        'onUpdate:modelValue': (value:any) => handleChange(name,value),
      }),
      ...(options.native !== false && {
        value: values[name],
        onInput: (el:any) => handleChange(name,el && (el.target && el.target.value))
      }),
      ...(options.clearable && {onClear: () => resetField(name)})
  })}

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

  const setValue:SetValue = async (key, value = null) => {
    const result = await interceptor({key,value,formState});
      if(!!result) {
      values[key] = value
      setDirtyState(key, !isEqual(value, initialValues[key] ?? (defaultValues[key] ?? null)))
    }
  }

  const isValid = () => {
    formState.isValid = !Object.keys(formState.errors).some(field => Object.keys(formState.errors[field]).length)
  }

  const triggerValidation:TriggerValidation = async (key) => {
    if(!Object.keys(validations).length){
      return
    }
    if(!key){
      for(const field of Object.keys(values)){
        await triggerValidation(field)
      }
      return
    }
    if(!Object.keys(validations[key]).length){
      return
    }
    formState.errors[key] = {}
    for(const [name,validation] of Object.entries(validations[key])){
      const result = await validation(values[key])
      formState.errors[key] = {
        ...formState.errors[key],
        ...(result !== true && {[name]: result})
      }
      if(result !== true && options.validationErrors !== 'all'){
        break;
      }
    }
  }

  const handleBlur:KeyFn = (key) => {
    setTouchedState(key,true)
    triggerValidation(key)
  }

  const handleChange:KeyValueFn = async (key, value = null) => {
    await setValue(key, value)
    setTouchedState(key,true)
    triggerValidation(key)
  }

  const clearField:ClearField = async (key) => {
    await setValue(key, defaultValues[key] ?? null)
  }

  const resetField:ResetField = (key) => {
    setValue(key, initialValues[key] ?? defaultValues[key] ?? null)
    setTouchedState(key, false)
  }

  const resetForm:ResetForm = () => {
    Object.keys(values).forEach((key)=>{
      resetField(key)
    })
  }

  const setError:SetError = (key, error, replace = false) => {
    formState.errors[key] = {
      ...(!replace && formState.errors[key]),
      ...error
    }
  }

  const clearErrors:ClearErrors = (key, errors) => {
    if(!key){
      formState.errors = {}
      return;
    }
    if(!errors){
      formState.errors[key] = {}
      return;
    }
    formState.errors[key] = Object.fromEntries(Object.entries(formState.errors[key])
    .filter(([key])=> Array.isArray(errors) ? !errors.includes(key) : errors !== key))
  }

  const modifiedValues:ModifiedValues = () => {
    return Object.fromEntries(Object.entries(values).filter(([key]) => formState.dirty[key]))
  }

  const handleSubmit:HandleSubmit = async (successFn, errorFn, {diff} = {}) => {
    let valid = false;
    if(validate){
      valid = await validate()
    }
    else{
      await triggerValidation() // just validate non-dirty fields?
      valid = formState.isValid
    }
    if(valid){
      successFn(values)
      return
    }
    if(errorFn){
      errorFn(formState.errors)
      return
    }
    throw new Error('One or more errors found during validation')
  }


  watch(
  ()=> formState.errors,
  ()=> {
    isValid();
  }, {deep:true})

  return {
    values: readonly(values),
    formState,
    register,
    setValue,
    setError,
    clearErrors,
    clearField,
    resetField,
    resetForm,
    handleSubmit,
    modifiedValues,
    triggerValidation,
  }
}
