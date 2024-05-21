<script setup>
import { ref } from "vue";
import { watchDebounced } from "@vueuse/core";
import draggable from "vuedraggable";

import { storeToRefs } from "pinia";
import { useTagStore } from "../stores/tags";

import TagEditor from "../components/TagEditor.vue";

const store = useTagStore();
const { addTag, editTag, removeTag, getUrl } = store;
const { tags } = storeToRefs(store);

const url = ref(null);
url.value = getUrl();

watchDebounced(
  tags,
  () => {
    url.value = getUrl();
  },
  { debounce: 500, maxWait: 1000 }
);
</script>

<template>
  <main>
    <img :src="url" alt="test" />
    <draggable v-model="tags" item-key="text" class="tag-list">
      <template #item="{ element: tag, index: idx }">
        <TagEditor
          :tag="tag"
          v-on:tagChanged="(t) => editTag(t, idx)"
          v-on:tagRemoved="removeTag(idx)"
          v-on:tagCopied="addTag(tag)"
        />
      </template>
      <template #footer v-if="tags.length <= 25">
        <button
          class="add-tag"
          @click="
            addTag({
              text: 'New Tag',
              bg: '#40a6ce',
              color: '#000000',
            })
          "
        >
          Add Tag
        </button>
      </template>
    </draggable>
  </main>
</template>

<style scoped>
main {
  @apply container max-w-[768px] flex flex-col gap-2;
}

.add-tag {
  @apply px-2 py-1 rounded-lg select-none border-4 border-dashed border-slate-400;
}

.tag-list {
  @apply flex flex-1 flex-col gap-2 select-none;
}
</style>
