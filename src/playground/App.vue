<template>
    <form @submit.prevent="() => handleSubmit(submitForm)">
        <h2> VSSTS </h2>
        <input v-bind="register('hello', {
            useNativeValidation: true,
            required: true,
            disabled: true,
        })"><br>
        <br>
        <input type="radio" value="male" v-bind="register('gender')"> Male<br>
        <input type="radio" value="female" v-bind="register('gender')"> Female<br>
        <input type="radio" value="other" v-bind="register('gender')"> Other<br>
        <br>
        <input type="text">
        <button>Submit</button>
    </form>
</template>

<script setup lang="ts">
import useFormHandler from '../useFormHandler';
import { ref } from 'vue'

const { register, handleSubmit } = useFormHandler({});
const submitForm = (values: any) => {
    console.log(values)
}
</script>

<style>

</style>