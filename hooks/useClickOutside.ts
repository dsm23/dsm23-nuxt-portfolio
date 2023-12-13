import { onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

export const useClickOutside = (
  ref: Ref<HTMLElement | undefined> | null = null,
  callback = () => {},
) => {
  function handleClickOutside(event: Event) {
    if (ref?.value && !ref.value.contains(event.target as Node)) {
      callback();
    }
  }

  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
};
