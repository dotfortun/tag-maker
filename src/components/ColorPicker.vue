<script setup>
import { ref, watch } from "vue";
const colors = ref({
  h: 0,
  s: 0,
  l: 0,
  a: 1,
});
</script>

<template>
  <div class="color-picker">
    <div
      class="color-square w-full aspect-square m-auto rounded-md"
      :style="{
        background: `hsla(${colors.h}, ${colors.s}%, ${colors.l}%, ${colors.a})`,
      }"
    ></div>
    <div class="sliders">
      <label>
        <input
          class="hue"
          type="range"
          :min="0"
          :max="360"
          :step="1"
          :style="{
            accentColor: `hsla(${colors.h}, ${colors.s}%, ${colors.l}%, ${colors.a})`,
          }"
        />
        hue
      </label>
      <label>
        <input
          type="range"
          :min="0"
          :max="100"
          :step="1"
          :style="{
            accentColor: `hsla(${colors.h}, ${colors.s}%, ${colors.l}%, ${colors.a})`,
          }"
        />
        sat
      </label>
      <label>
        <input
          type="range"
          :min="0"
          :max="100"
          :step="1"
          :style="{
            accentColor: `hsla(${colors.h}, ${colors.s}%, ${colors.l}%, ${colors.a})`,
          }"
        />
        lum
      </label>
    </div>
  </div>
</template>

<style scoped>
div.color-picker {
  /* @apply flex flex-col gap-2 justify-center; */
  @apply grid grid-cols-3 gap-2;
}

div.sliders {
  @apply max-sm:flex max-sm:flex-col gap-4 my-4;
  @apply col-span-2;
}

input {
  @apply w-1/2 mr-2;
}

label {
  @apply flex align-middle;
}
</style>
