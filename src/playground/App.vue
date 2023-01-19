<template>
    <form @submit.prevent="() => handleSubmit(submitForm)">
        <h2> VSSTS </h2>
        <input v-bind="register('hello', {
            required: 'Something is required',
            pattern: /^[A-Za-z]+$/i
        })"><br>
        <input type="number" v-bind="register('hello2', {
            min: 5,
            max: 10
        })"><br>
        <input v-bind="register('hello3', {
            minLength: {
                value: 5,
                message: 'Min length is 5'
            },
            maxLength: 20,
            disabled: values.hello2 > 5
        })"><br>
        <br>
        <button>Submit</button>
        <pre>{{ values }}</pre>
        <pre>{{ formState }}</pre>
    </form>
</template>

<script setup lang="ts">
import useFormHandler from '../useFormHandler';

const { register, handleSubmit, values, formState } = useFormHandler({});
const submitForm = (values: any) => {
    console.log(values)
}
</script>

<style>

</style>