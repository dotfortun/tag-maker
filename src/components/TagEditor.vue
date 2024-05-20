<script setup lang="ts">
import { type Tag } from "@/types";

const { tag } = defineProps<{
  tag: Tag;
}>();
</script>

<template>
  <div class="tag-editor">
    <div class="handle"><i class="fa-solid fa-bars"></i></div>
    <input
      type="text"
      class="text"
      :value="tag.text"
      :style="{ background: tag.bg, color: tag.color }"
    />
  </div>
</template>

<style scoped>
.tag-editor {
  @apply w-full flex flex-1 flex-row gap-2;
}

.input {
  @apply rounded-md;
}
</style>
