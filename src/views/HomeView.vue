<script setup>
import { ref } from "vue";
import { watchDebounced } from "@vueuse/core";
import draggable from "vuedraggable";

import { storeToRefs } from "pinia";
import { useTagStore } from "../stores/tags";

import TagEditor from "../components/TagEditor.vue";

import "dot-components/dist/style.css";
import { Credits } from "dot-components";

const store = useTagStore();
const { addTag, editTag, removeTag, getUrl } = store;
const { tags } = storeToRefs(store);

const url = ref("/tags.png");

watchDebounced(
  tags,
  () => {
    url.value = getUrl();
  },
  { debounce: 500, maxWait: 1000, deep: true }
);
</script>

<template>
  <main>
    <img :src="url" alt="test" />
    <draggable
      v-model="tags"
      item-key="text"
      class="tag-list"
      ghost-class="ghost"
      handle=".handle"
    >
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

    <Credits
      eve-credits
      bug-url="https://github.com/dotfortun/tag-maker/issues"
    />
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

.ghost {
  @apply border-dashed opacity-25;
}

footer {
  @apply container mx-auto mb-3;
  @apply flex flex-row content-center justify-between p-4 text-slate-400;
  @apply max-lg:flex-col max-lg:items-center max-lg:text-center;
}

footer a {
  @apply text-cyan-400 decoration-solid;
}

footer ul {
  @apply pl-0;
}
</style>
