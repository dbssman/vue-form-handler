<template>
    <iframe
        :src="`https://codesandbox.io/embed/github/dbssman/vue-form-handler/tree/master/examples/${example}?fontsize=12&hidenavigation=1&theme=dark`"
        style="border:0;borderRadius:4;overflow:hidden;max-height:80vh" :style="styleObject"
        :title="`dbssman/vue-form-handler: ${example}`"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

defineProps({
    example: {
        type: String,
        required: true,
    },
})

const height = ref(0)
const width = ref(0)
const fixedContainerPadding = 64

const styleObject = computed(() => ({
    width: `${width.value - fixedContainerPadding}px`,
    height: `${height.value - fixedContainerPadding}px`,
}))

const setDimensions = () => {
    height.value = Number(document.querySelector('.VPContent')?.clientHeight)
    width.value = Number(document.querySelector('.VPDoc')?.clientWidth)
}

onMounted(() => {
    setDimensions()
})

window.addEventListener('resize', setDimensions)
</script>

<style>

</style>