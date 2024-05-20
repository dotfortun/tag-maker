<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTagStore } from "../stores/tags";

import draggable from "vuedraggable";
const store = useTagStore();
const { addTag } = store;
const { url, tags } = storeToRefs(store);
</script>

<template>
  <main>
    <img :src="url" alt="test" />
    <button
      class="bg-green-700 rounded-md px-2 py-1"
      @click="
        addTag({
          text: 'TAG!',
          bg: '#ec942cff',
          color: '#000000FF',
        })
      "
    >
      Add Tag
    </button>

    <hr />
    <code>
      {{ tags }}
    </code>
  </main>
</template>
