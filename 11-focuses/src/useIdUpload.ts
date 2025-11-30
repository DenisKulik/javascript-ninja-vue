import { ref } from "vue";

export function useIdUpload() {
  const isLoading = ref(false);
  const isExtraSpellingNeeded = ref(false);
  const isIdProvided = ref(false);

  const upload = () => {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
      isIdProvided.value = true;
      isExtraSpellingNeeded.value = Boolean(Math.random() > 0.5);
    }, 2000);
  };

  const provideSpelling = () => {
    isExtraSpellingNeeded.value = false;
  };

  return {
    isLoading,
    isIdProvided,
    upload,
    provideSpelling,
    isExtraSpellingNeeded,
  };
}
