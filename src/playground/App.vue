<template>
    <h2> VSSTS </h2>
    <input v-bind="register('hello')"><br>
    <input type="number" v-bind="register('number')"><br>
    <input type="radio" value="female" name="test"> Female<br>
    <input type="radio" value="other" name="test"> Other<br>
    <br>
    <input type="radio" value="male" v-bind="register('gender')"> Male<br>
    <input type="radio" value="female" v-bind="register('gender')"> Female<br>
    <input type="radio" value="other" v-bind="register('gender')"> Other<br>
    <br>
    <input type="checkbox" v-bind="register('checkbox')"> Other <br>
    <br>
    <select v-bind="register('select1')" style="min-width:300px">
        <option value="">--- Please select option ---</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
    </select><br>
    <br>
    <select v-bind="register('select')" style="min-width:300px" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
    </select><br>
    <br>
    <textarea v-bind="register('textArea')"></textarea>
    <pre>{{ values }}</pre>
    <pre>{{ formState }}</pre>
    <pre>{{ modifiedValues() }}</pre>
    <template v-if="!!dynamic">
        <input v-bind="register('dynamic')"> <br>
    </template> <br>

    <button @click="setValue('gender', 'female')">Set radio to female</button>
    <button @click="setValue('select', ['dog', 'cat'])">Set select to dog & cat</button>
    <button @click="resetField('checkbox')">Reset checkbox</button>
    <button @click="dynamic = true">Add dynamic field</button>
</template>

<script setup lang="ts">
import useFormHandler from '../useFormHandler';
import { ref } from 'vue'
const dynamic = ref(false)

const { register, values, formState, resetField, setValue, modifiedValues } = useFormHandler({
    initialValues: {
        gender: 'male'
    }
});

</script>

<style>

</style>