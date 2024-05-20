<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

import { storeToRefs } from "pinia";
import { useTagStore } from "../stores/tags";

import TagEditor from "../components/TagEditor.vue";

const store = useTagStore();
const { addTag, editTag, removeTag } = store;
const { url, tags } = storeToRefs(store);
</script>

<template>
  <main>
    <img :src="url" alt="test" />
    <button
      class="add-tag"
      @click="
        addTag({
          text: 'New Tag',
          bg: '#40a6ceff',
          color: '#000000FF',
        })
      "
    >
      Add Tag
    </button>
    <draggable v-model="tags" item-key="text" class="tag-list">
      <template #item="{ element: tag, index: idx }">
        <TagEditor
          :tag="tag"
          v-on:tagChanged="(t) => editTag(t, idx)"
          v-on:tagRemoved="removeTag(idx)"
        />
      </template>
    </draggable>
  </main>
</template>

<style scoped>
main {
  @apply container;
}

.add-tag {
  @apply bg-emerald-700 px-2 py-1 rounded-md select-none;
}

.tag-list {
  @apply flex flex-1 flex-col gap-2 select-none;
}
</style>
