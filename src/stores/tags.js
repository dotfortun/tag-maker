import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const defaultColors = [
  { name: "blue", code: "#40a6ce" },
  { name: "green", code: "#99cc33" },
  { name: "yellow", code: "#f9e154" },
  { name: "orange", code: "#ec942c" },
  { name: "red", code: "#f02c2c" },
  { name: "purple", code: "#763053" },
  { name: "white", code: "#ffffff" },
  { name: "black", code: "#000000" },
];

export const hex2rgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // return {r, g, b} 
  return { r, g, b };
}

export const getTextColor = (hexColor) => {
  const col = hex2rgb(hexColor);
  if ((col.r * 0.299 + col.g * 0.587 + col.b * 0.114) > 186) {
    return "#000000"
  }
  return "#ffffff"
}

export const useTagStore = defineStore("tags", () => {

  const tags = ref([
    { text: "Ceci", bg: "#40a6ce", color: "#000000" },
    { text: "n'est", bg: "#99cc33", color: "#FFFFFF" },
    { text: "pas", bg: "#99cc33", color: "#FFFFFF" },
    { text: "une", bg: "#f9e154", color: "#000000" },
    { text: "tag", bg: "#ec942c", color: "#FFFFFF" },
  ]);

  const getUrl = () => {
    const urlTags = tags.value.map(tag => {
      const t = JSON.parse(JSON.stringify(tag));
      t.bg = t.bg.padEnd(9, "f");
      t.color = t.color.padEnd(9, "f");
      return t;
    })

    return `https://discord-tagger.vercel.app/?q=${encodeURIComponent(
      JSON.stringify(urlTags)
    )}`;
  };

  const addTag = (tag) => {
    tags.value = [...tags.value, tag];
  };

  const editTag = (tag, idx) => {
    tags.value[idx] = tag;
  };

  const removeTag = (idx) => {
    tags.value.splice(idx, 1);
    if (tags.value.length === 0) {
      addTag({ text: "Tag this!", bg: "#40a6ceff", color: "#000000FF" })
    }
  }

  return { tags, getUrl, addTag, editTag, removeTag };
});
