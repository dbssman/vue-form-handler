<template>
    <h2>Playground</h2>
    <input v-bind="register('playground')">
</template>

<script setup lang="ts">
import { useFormHandler } from '../src/index'

const { register } = useFormHandler();

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
    color: #42B883;
    min-height: 100vh;
}

h2 {
    margin: 1em;
}

label {
    display: block;
}

form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1em;
}

input,
select,
textarea,
button {
    border: none;
    border-radius: 5px;
    width: 300px;
    min-height: 40px;
    background-color: #35495E;
    color: #42B883;
}

button {
    background-color: #42B883;
    color: #35495E;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
}
</style>