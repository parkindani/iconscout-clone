import { ref, onMounted } from "vue";

export const useFakeAuth = () => {
  const isAuthenticated = ref(false);
  const login = () => {
    isAuthenticated.value = true;
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    isAuthenticated.value = false;
    localStorage.removeItem("isAuthenticated");
  };

  onMounted(() => {
    if (typeof localStorage === "undefined") {
      isAuthenticated.value = false;
      return;
    }
    isAuthenticated.value = localStorage.getItem("isAuthenticated") === "true";
  });

  return { login, logout, isAuthenticated };
};
