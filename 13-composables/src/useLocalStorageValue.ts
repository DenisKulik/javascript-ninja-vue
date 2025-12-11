import {
  ref,
  shallowRef,
  type Ref,
  watchEffect,
  toValue,
  type MaybeRefOrGetter,
  onBeforeMount,
  onUnmounted,
  watch,
} from "vue";

type UseLocalStorageValueOptions = {
  syncTabs?: boolean;
};

export function useLocalStorageValue<ValueType>(
  key: MaybeRefOrGetter<string>,
  initialValue: MaybeRefOrGetter<ValueType>,
  options: Ref<UseLocalStorageValueOptions>
): {
  value: Ref<ValueType>;
} {
  let storageAbortController: AbortController | null = null;
  const value = shallowRef(toValue(initialValue));

  onBeforeMount(() => {
    watchEffect(() => {
      const hasValue = window.localStorage.getItem(toValue(key)) !== null;
      if (!hasValue) {
        return;
      }

      value.value = JSON.parse(
        window.localStorage.getItem(toValue(key)) ?? "null"
      );
    });

    watchEffect(() => {
      const serializedValue = JSON.stringify(value.value);
      window.localStorage.setItem(toValue(key), serializedValue);
    });

    watch(
      () => options.value.syncTabs,
      (newVal) => {
        if (storageAbortController) {
          storageAbortController.abort();
          storageAbortController = null;
        }

        if (newVal) {
          storageAbortController = new AbortController();
          window.addEventListener(
            "storage",
            (event) => {
              if (event.key === toValue(key)) {
                value.value = JSON.parse(event.newValue ?? "null") as ValueType;
              }
            },
            { signal: storageAbortController.signal }
          );
        }
      },
      { immediate: true, deep: true }
    );
  });

  onUnmounted(() => {
    storageAbortController?.abort();
  });

  return { value };
}
