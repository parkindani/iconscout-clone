<script setup lang="ts">
const props = defineProps<{
  title: string;
  active: boolean;
}>();
</script>

<template>
  <button :class="props.active ? 'active' : 'default'">
    {{ props.title }}
  </button>
</template>

<style lang="scss" scoped>
button {
  border: none;
  background-color: transparent !important;
  font-family: "AvertaStd", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  padding-top: 15px;
}

.active {
  color: #000000;
  padding-bottom: 10px;
  border-bottom: 2px solid #000000;
}

.default {
  color: #2f72bc;
  padding-bottom: 12px;
}
</style>
