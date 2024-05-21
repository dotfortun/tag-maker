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
          text: tag.text,
          bg: $event.value.code,
          color: tag.color,
        })
      "
    />
    <label>
      background:
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
        :style="{ background: tag.bg, color: getTextColor(tag.bg) }"
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
    <i class="fa-solid fa-copy copy-button" @click="$emit('tagCopied')"></i>
    <i class="fa-solid fa-xmark delete-button" @click="$emit('tagRemoved')"></i>
  </div>
</template>

<style scoped>
.tag-editor {
  @apply w-full flex flex-1 flex-row gap-2;
}

.input {
  @apply rounded-md;
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
