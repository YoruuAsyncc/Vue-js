import { ref, onUnmounted } from "vue";

export function useToast() {
  let toastTimer: ReturnType<typeof setTimeout> | undefined;

  const toast = ref({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  function hideToast() {
    toast.value.show = false;

    if (toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = undefined;
    }
  }

  function showToast(message: string, type: "success" | "error" = "success") {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toast.value = {
      show: true,
      message,
      type,
    };

    toastTimer = setTimeout(hideToast, 3000);
  }

  onUnmounted(() => {
    if (toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = undefined;
    }
  });

  return {
    toast,
    showToast,
    hideToast,
  };
}
