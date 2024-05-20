import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import { type Tag } from "@/types";

export const useTagStore = defineStore("tags", () => {
  const tags: Ref<Tag[]> = ref([
    { text: "This", bg: "#40a6ceff", color: "#000000FF" },
    { text: "was", bg: "#99cc33ff", color: "#FFFFFFFF" },
    { text: "passed", bg: "#99cc33ff", color: "#FFFFFFFF" },
    { text: "in", bg: "#f9e154ff", color: "#000000FF" },
    { text: "through", bg: "#ec942cff", color: "#FFFFFFFF" },
    { text: "the", bg: "#f02c2cff", color: "#FFFFFFFF" },
    { text: "url", bg: "#763053FF", color: "#000000FF" },
  ]);

  const url = computed((): string => {
    return `https://discord-tagger.vercel.app/?q=${encodeURIComponent(
      JSON.stringify(tags.value)
    )}`;
  });

  const addTag = (tag: Tag) => {
    tags.value = [...tags.value, tag];
  };

  const editTag = (tag: Tag, idx: number) => {
    tags.value.splice(idx, 1, tag);
  };

  return { tags, url, addTag, editTag };
});
