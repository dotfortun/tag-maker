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

    <footer>
      <div>
        <small>
          <ul>
            <li class="list-none">
              Created by <a href="https://github.com/dotfortun">dotfortun.</a>
            </li>
            <li class="list-none">
              <template v-if="diceroll < 0.05">
                Yes, this is basically just Nakamura Labs' Time tool but with
                Discord timestamps.
              </template>
              <template v-else>
                Donations to Peter Dostoevsky in Eve Online will be turned into
                lossmails.
              </template>
            </li>
            <li class="list-none">
              <a
                href="https://www.eveonline.com/signup?invc=5d52b821-87c0-4c81-bd0a-2cd88e9001b6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try Eve Online
              </a>
              or
              <a
                href="https://www.buymeacoffee.com/shanebelldev"
                target="_blank"
                rel="noopener noreferrer"
                >buy me a coffee</a
              >
            </li>
          </ul>
        </small>
      </div>
      <div>
        <p>
          <a href="https://github.com/dotfortun/tag-maker/issues">
            Found a bug? Tell us here!
          </a>
        </p>
      </div>
    </footer>
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
