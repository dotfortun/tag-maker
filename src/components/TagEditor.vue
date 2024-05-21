<script setup>
import { ref } from "vue";
import ColorPicker from "primevue/colorpicker";

const { tag, change } = defineProps(["tag", "change"]);
const tagState = ref(tag);

defineEmits(["tagChanged"]);
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
          text: $event.target.value,
          bg: tag.bg,
          color: tag.color,
        })
      "
    />
    <ColorPicker
      :defaultColor="tag.bg"
      format="hex"
      @change="
        $emit('tagChanged', {
          text: tag.text,
          bg: `#${$event.value.toUpperCase()}FF`,
          color: tag.color,
        })
      "
    />
    <ColorPicker
      :defaultColor="tag.color"
      format="hex"
      @change="
        $emit('tagChanged', {
          text: tag.text,
          bg: tag.bg,
          color: `#${$event.value.toUpperCase()}FF`,
        })
      "
    />
    <i
      class="fa-solid fa-trash-can delete-button"
      @click="$emit('tagRemoved')"
    ></i>
  </div>
</template>

<style scoped>
.tag-editor {
  @apply w-full flex flex-1 flex-row gap-2;
}

.input {
  @apply rounded-md;
}

.delete-button {
  @apply aspect-square bg-red-700 p-2 rounded-md;
}
</style>
