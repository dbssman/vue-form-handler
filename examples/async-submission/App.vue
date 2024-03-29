<template>
  <section>
    <form @submit.prevent="submit()">
      <label
        >Email:
        <input
          type="email"
          v-bind="
            register('email', {
              required: true,
              pattern: emailRegExp,
            })
          "
        />
      </label>
      <p class="error" v-show="formState.errors.email">
        {{ formState.errors.email }}
      </p>
      <label>
        Password:
        <input
          type="password"
          v-bind="
            register('password', {
              required: true,
              pattern: passwordRegExp,
            })
          "
        />
      </label>
      <p class="error" v-show="formState.errors.password">
        {{ formState.errors.password }}
      </p>
      <label>
        Confirm Password:
        <input
          type="password"
          v-bind="
            register('confirmPassword', {
              required: true,
              pattern: passwordRegExp,
              validate: {
                match: (value) =>
                  value === values.password || 'Passwords do not match',
              },
            })
          "
        />
      </label>
      <p class="error" v-show="formState.errors.confirmPassword">
        {{ formState.errors.confirmPassword }}
      </p>
      <button>Submit</button>
    </form>
  </section>
</template>
<script lang="ts">
import { useFormHandler } from 'vue-form-handler'

export default {
  setup: () => {
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    const { values, register, formState, handleSubmit } = useFormHandler({
      validationMode: 'always',
    })

    // success/error functions can be used in the handleSubmit function to handle the form submission
    const successFn = (form: Record<string, any>) => {
      console.log('Form correctly submitted:', form)
    }

    const errorFn = (errors: Record<string, any>) => {
      console.error('There where errors while submitting the form:', errors)
    }

    // async/await can be used to do things after the form submission
    const submit = async () => {
      await handleSubmit(successFn, errorFn)
      alert(`was success? ${formState.isValid}`)
      // Do something else
    }

    return {
      passwordRegExp,
      emailRegExp,
      values,
      register,
      formState,
      submit,
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
