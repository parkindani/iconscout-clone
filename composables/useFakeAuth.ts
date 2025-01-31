export const useFakeAuth = () => {
  const isAuthenticated = useState<boolean>("isAuthenticated", () => false);

  const login = () => {
    isAuthenticated.value = true;
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    isAuthenticated.value = false;
    localStorage.removeItem("isAuthenticated");
    window?.location.reload();
  };

  onMounted(() => {
    if (typeof localStorage !== "undefined") {
      isAuthenticated.value =
        localStorage.getItem("isAuthenticated") === "true";
    }
  });

  return { isAuthenticated, login, logout };
};
