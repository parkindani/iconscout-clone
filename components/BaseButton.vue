<script setup lang="ts">
const props = defineProps<{
  type: "line" | "primary";
}>();
</script>

<template>
  <button :class="`btn-${props.type}`">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  font-family: "AvertaStd", sans-serif;
  font-weight: 600;
  border-radius: 999px;
  padding: 10px 20px;
}

.btn-line {
  background-color: #ffffff;
  border: 1px solid #d8dbeb;
  color: #000000;
}

.btn-primary {
  border: 1px solid #0092e4;
  background-color: #0092e4;
  color: #ffffff;
}
</style>
