<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTagStore } from "../stores/tags";

import draggable from "vuedraggable";
const { addTag, ...store } = useTagStore();
const { url, tags } = storeToRefs(useTagStore());
</script>

<template>
  <main>
    <img :src="url" alt="test" />
    <button
      class="bg-green-700 rounded-md px-2 py-1"
      @click="
        addTag({
          text: 'TAG!',
          bg: '#f9e154ff',
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
