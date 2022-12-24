import { ModifiedValues, TriggerValidation, Validations, FormHandler, ResetField, ResetForm, InitControl, SetError, ClearErrors, SetValue, ClearField, SetDirty, SetTouched, HandleBlur, HandleChange, GetInitValueForControl } from './types';
import { FormState, HandleSubmit, Register } from './types';
import { reactive, readonly, watch } from 'vue'
import { isEqual } from 'lodash-es'

export const initialState = () => ({
  touched: {},
  dirty: {},
  errors: {},
  isDirty: false,
  isTouched: false,
  isValid: true,
})

//TODO: separate synchronous from asynchronous validations
//TODO: extend validation behaviours
const useFormHandler:FormHandler = ({ 
  initialValues = {}, 
  interceptor, 
  validate,
  options = { validationBehaviour: 'always', validationErrors: 'first' }
} = {}) => {
  const values:Record<string,any> = reactive({ ...initialValues })
  const formState = reactive<FormState>({...initialState()})

  let validations:Record<string,Validations> = {}
  let defaultValues:Record<string,any> = {}

  const getInitValueForControl:GetInitValueForControl = (name) => initialValues[name] ?? (defaultValues[name] ?? null)
  const initControl:InitControl = (name, options) => {
    validations = {
      ...validations,
      [name]: options.validations || {}
    }
    defaultValues = {
      ...defaultValues,
      [name]: options.defaultValue
    }
    if(initialValues[name] === undefined && values[name] === undefined){
      values[name] = options.defaultValue ?? null
    }
  }

  const isValid = () => {
    formState.isValid = !Object.keys(formState.errors).some(field => Object.keys(formState.errors[field]).length)
  }

  const triggerValidation:TriggerValidation = async (name) => {
    if(!Object.keys(validations).length){
      return
    }
    if(!name){
      for(const field of Object.keys(values)){
        await triggerValidation(field)
      }
      return
    }
    if(!Object.keys(validations[name]).length){
      return
    }
    formState.errors[name] = {}
    for(const [validationName, validation] of Object.entries(validations[name])){
      const result = await validation(values[name])
      formState.errors[name] = {
        ...formState.errors[name],
        ...(result !== true && {[validationName]: result})
      }
      if(result !== true && options.validationErrors !== 'all'){
        break;
      }
    }
  }

  const setDirty:SetDirty = (name, dirty) => {
    if(formState.dirty[name] !== dirty){
      formState.dirty[name] = dirty
      formState.isDirty = dirty || Object.values(formState.dirty).some(Boolean)
    }
  }

  const setTouched:SetTouched = (name, touched) => {
    if(formState.touched[name] !== touched){
      formState.touched[name] = touched
      formState.isTouched = touched || Object.values(formState.touched).some(Boolean)
    }
  }

  const resetField:ResetField = (name) => {
    values[name] = getInitValueForControl(name)
    setTouched(name, false)
    setDirty(name, false)
  }

  const resetForm:ResetForm = () => {
    Object.keys(values).forEach((key)=>{
      resetField(key)
    })
  }

  const setError:SetError = (name, error, replace = false) => {
    formState.errors[name] = {
      ...(!replace && formState.errors[name]),
      ...error
    }
  }

  const clearErrors:ClearErrors = (name, errors) => {
    if(!name){
      formState.errors = {}
      return;
    }
    if(!errors){
      formState.errors[name] = {}
      return;
    }
    formState.errors[name] = Object.fromEntries(Object
      .entries(formState.errors[name])
      .filter(([errorName])=> Array.isArray(errors) 
        ? !errors.includes(errorName) 
        : errors !== errorName))
  }

  const modifiedValues:ModifiedValues = () => {
    return Object.fromEntries(Object
      .entries(values)
      .filter(([name]) => formState.dirty[name]))
  }

  const setValue:SetValue = async (name, value = null) => {
      if(!interceptor || await interceptor({name, value, values, formState, clearErrors, modifiedValues, resetField, resetForm, setError, triggerValidation})) {
      values[name] = value
      setDirty(name, !isEqual(value, getInitValueForControl(name)))
    }
  }

  const handleBlur:HandleBlur = (name) => {
    setTouched(name,true)
    triggerValidation(name)
  }

  const handleChange:HandleChange = async (name, value = null) => {
    await setValue(name, value)
    setTouched(name,true)
    triggerValidation(name)
  }

  const clearField:ClearField = async (name) => {
    await setValue(name, defaultValues[name] ?? null)
  }

  const register:Register = (name, options = {}) => {
    initControl(name,options);
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
        onInput: (el:any) => handleChange(name,el && (el.target && el.target.value)),
        ...(options.required && {required: true})
      }),
      ...(options.clearable && {onClear: () => resetField(name)})
  })}

  const handleSubmit:HandleSubmit = async (successFn, errorFn) => {
    let valid = false;
    if(validate){
      valid = await validate()
    }
    else{
      await triggerValidation()
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
  }, {deep:true, immediate:true})

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

export default useFormHandler
