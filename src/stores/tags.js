import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTagStore = defineStore("tags", () => {
  const tags = ref([
    { text: "This", bg: "#40a6ce", color: "#000000" },
    { text: "was", bg: "#99cc33", color: "#FFFFFF" },
    { text: "passed", bg: "#99cc33", color: "#FFFFFF" },
    { text: "in", bg: "#f9e154", color: "#000000" },
    { text: "through", bg: "#ec942c", color: "#FFFFFF" },
    { text: "the", bg: "#f02c2c", color: "#FFFFFF" },
    { text: "url", bg: "#763053", color: "#000000" },
  ]);

  const url = computed(() => {
    const urlTags = tags.value.map(tag => {
      const t = JSON.parse(JSON.stringify(tag));
      t.bg = t.bg.padEnd(9, "f");
      t.color = t.color.padEnd(9, "f");
      return t;
    })

    return `https://discord-tagger.vercel.app/?q=${encodeURIComponent(
      JSON.stringify(urlTags)
    )}`;
  });

  const addTag = (tag) => {
    tags.value = [...tags.value, tag];
  };

  const editTag = (tag, idx) => {
    console.table([tags.value[idx], tag])
    tags.value[idx] = tag;
  };

  const removeTag = (idx) => {
    tags.value.splice(idx, 1);
    if (tags.value.length === 0) {
      addTag({ text: "Tag this!", bg: "#40a6ceff", color: "#000000FF" })
    }
  }

  return { tags, url, addTag, editTag, removeTag };
});
