<script setup>
import { ref } from "vue";

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
        (ev) => {
          tagState.text = ev.target.value;
          $emit('tagChanged', {
            text: tagState.text,
            bg: tagState.bg,
            color: tagState.color,
          });
        }
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
