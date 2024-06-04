<script setup>
import { ref } from "vue";
import { defaultColors, getTextColor } from "../stores/tags";
import ColorPicker from "primevue/colorpicker";

const { tag, change } = defineProps(["tag", "change"]);
const tagState = ref(tag);
const bgPicker = ref(null);
const colPicker = ref(null);

defineEmits(["tagChanged", "tagRemoved", "tagCopied"]);
</script>
6
<template>
  <div class="tag-editor">
    <div class="handle"><i class="fa-solid fa-bars"></i></div>
    <input
      type="text"
      class="text"
      :value="tag.text"
      :style="{ background: tag.bg, color: tag.color }"
      @change="
        $emit('tagChanged', {
          text: $event.target.value,
          bg: tag.bg,
          color: tag.color,
        })
      "
    />
    <label>
      bg:
      <select
        v-model="bgPicker"
        :style="{ background: tag.bg, color: tag.color }"
        @change="
          $emit('tagChanged', {
            text: tag.text,
            bg: $event.target.value,
            color: tag.color,
          })
        "
      >
        <option
          v-for="col of defaultColors"
          :value="col.code"
          :style="{ background: col.code, color: getTextColor(col.code) }"
        >
          {{ col.name }}
        </option>
      </select>
      &nbsp;
      <ColorPicker
        :defaultColor="tag.bg"
        format="hex"
        @change="
          bgPicker = null;
          $emit('tagChanged', {
            text: tag.text,
            bg: `#${$event.value.toUpperCase()}FF`,
            color: tag.color,
          });
        "
      />
    </label>

    <label>
      text:
      <select
        :style="{ background: tag.color, color: getTextColor(tag.color) }"
        v-model="colPicker"
        @change="
          $emit('tagChanged', {
            text: tag.text,
            bg: tag.bg,
            color: $event.target.value,
          })
        "
      >
        <option
          v-for="col of defaultColors"
          :value="col.code"
          :style="{ background: col.code, color: getTextColor(col.code) }"
        >
          {{ col.name }}
        </option>
      </select>
      &nbsp;
      <ColorPicker
        :defaultColor="tag.color"
        format="hex"
        @change="
          colPicker = null;
          $emit('tagChanged', {
            text: tag.text,
            bg: tag.bg,
            color: `#${$event.value.toUpperCase()}FF`,
          });
        "
      />
    </label>
    <span>
      <i class="fa-solid fa-copy copy-button" @click="$emit('tagCopied')"></i>
      &nbsp;
      <i
        class="fa-solid fa-xmark delete-button"
        @click="$emit('tagRemoved')"
      ></i>
    </span>
  </div>
</template>

<style scoped>
.tag-editor {
  @apply w-full flex flex-1 flex-col md:flex-row justify-between gap-2 px-4 py-3;
  @apply border-slate-500 border-4 rounded-lg;
}

input {
  @apply rounded-md px-2;
}

select {
  @apply px-2 py-1 rounded-md;
}

option {
  @apply bg-blend-difference text-white;
}

.delete-button {
  @apply aspect-square bg-red-700 p-2 rounded-md;
}

.copy-button {
  @apply aspect-square bg-emerald-700 p-2 rounded-md;
}
</style>
