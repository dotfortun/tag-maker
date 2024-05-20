import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface Tag {
  text: string;
  bg: number[] | string;
  color: number[] | string;
}

export const useTagStore = defineStore("tags", () => {
  const tags = ref([
    { text: "This", bg: "#40a6ceff", color: "#000000FF" },
    { text: "was", bg: "#99cc33ff", color: "#FFFFFFFF" },
    { text: "passed", bg: "#99cc33ff", color: "#FFFFFFFF" },
    { text: "in", bg: "#f9e154ff", color: "#FFFFFFFF" },
    { text: "through", bg: "#ec942cff", color: "#FFFFFFFF" },
    { text: "the", bg: "#f02c2cff", color: "#FFFFFFFF" },
    { text: "url", bg: "#763053FF", color: "#000000FF" },
  ]);

  const url = computed((): string => {
    return `https://discord-tagger.vercel.app/?q=${encodeURIComponent(
      JSON.stringify(tags.value)
    )}`;
  });

  const addTag = (tag) => {
    tags.value = [...tags.value, tag];
  };

  return { tags, url, addTag };
});
