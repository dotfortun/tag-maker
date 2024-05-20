<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

import { storeToRefs } from "pinia";
import { useTagStore } from "../stores/tags";
import TagEditor from "../components/TagEditor.vue";

const store = useTagStore();
const { addTag, editTag } = store;
const { url, tags } = storeToRefs(store);
</script>

<template>
  <main>
    <img :src="url" alt="test" />
    <draggable v-model="tags" item-key="text" class="tag-list">
      <template #item="{ element: tag, index: idx }">
        <TagEditor :tag="tag" :change="(t) => editTag(t, idx)" />
      </template>
    </draggable>
    <hr />
    <code>
      {{ tags }}
    </code>
  </main>
</template>

<style scoped>
main {
  @apply container;
}

.tag-list {
  @apply flex flex-1 flex-col gap-2;
}
</style>
