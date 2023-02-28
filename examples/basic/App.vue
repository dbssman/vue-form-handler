<template>
  <section>
    <form @submit.prevent="handleSubmit(successFn)">
      <label
        >Email:
        <input type="email" v-bind="register('email')" />
      </label>
      <label>
        Password:
        <input type="password" v-bind="register('password')" />
      </label>
      <label>
        Confirm Password:
        <input type="password" v-bind="register('confirmPassword')" />
      </label>
      <button>Submit</button>
    </form>
  </section>
</template>
<script lang="ts">
import { useFormHandler } from 'vue-form-handler'

export default {
  setup: () => {
    const { register, handleSubmit } = useFormHandler({
      validationMode: 'always',
    })
    const successFn = (form: Record<string, any>) => {
      console.log('Form correctly submitted:', form)
    }

    return {
      register,
      handleSubmit,
      successFn,
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
