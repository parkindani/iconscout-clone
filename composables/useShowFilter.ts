export const useShowFilter = () => {
  const isShowFilter = useState<boolean>("isShowFilter", () => false);
  const setFalse = () => {
    isShowFilter.value = false;
  };
  const setTrue = () => {
    isShowFilter.value = true;
  };
  const toggleShowFilter = () => {
    isShowFilter.value = !isShowFilter.value;
  };
  return { isShowFilter, setFalse, setTrue, toggleShowFilter };
};
