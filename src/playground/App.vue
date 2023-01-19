<template>
    <form @submit.prevent="() => handleSubmit(submitForm)">
        <h2> VSSTS </h2>
        <input v-bind="register('hello', {
            useNativeValidation: true,
            required: true,
        })"><br>
        <br>
        <input type="radio" value="male" v-bind="register('gender')"> Male<br>
        <input type="radio" value="female" v-bind="register('gender')"> Female<br>
        <input type="radio" value="other" v-bind="register('gender')"> Other<br>
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