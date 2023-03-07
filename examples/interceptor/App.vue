<template>
  <section>
    <form @submit.prevent="handleSubmit(successFn)">
      <p>
        You can use the interceptor to perform actions on any field change
        before and after or deny a field value change
      </p>
      <label
        >Name:
        <input v-bind="register('name')" />
      </label>
      <label
        >Email:
        <input type="email" v-bind="register('email')" />
      </label>
      <label
        >Type 1234Abcd to accept the terms and conditions:
        <input v-bind="register('tAndC')" />
      </label>
      <pre>
        {{ values }}
      </pre>
      <button>Submit</button>
    </form>
  </section>
</template>
<script lang="ts">
import { useFormHandler, Interceptor } from 'vue-form-handler'

const pageLoadTime = new Date().getTime()
const interceptor: Interceptor = ({ name, value }) => {
  if (name !== 'tAndC' || value !== '1234Abcd') {
    return true
  }
  if (new Date().getTime() - pageLoadTime < 30000) {
    alert(
      'You have to wait 30 seconds before accepting the terms and conditions, since you have to read them'
    )
    return false
  }
  return true
}

export default {
  setup: () => {
    const { register, handleSubmit, values } = useFormHandler({
      interceptor,
    })
    const successFn = (form: Record<string, any>) => {
      console.log('Form correctly submitted:', form)
    }

    return {
      register,
      handleSubmit,
      successFn,
      values,
    }
  },
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: center;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #242424;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #42b883;
  min-height: 100vh;
}

label {
  display: block;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

input,
select,
textarea,
button {
  border: none;
  border-radius: 5px;
  width: 300px;
  min-height: 40px;
  background-color: #35495e;
  color: #42b883;
}

button {
  background-color: #42b883;
  color: #35495e;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
