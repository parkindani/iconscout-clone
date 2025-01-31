<script setup lang="ts">
const props = defineProps<{
  count: number;
  label: string;
}>();
</script>

<template>
  <div role="status">
    <h2>{{ `${props.count.toLocaleString()} Limit ${props.label}` }}</h2>
    <p>
      {{ `${props.count.toLocaleString()} ${props.label}` }} exclusively
      selected by our designer community.
    </p>
  </div>
</template>

<style scoped lang="scss">
div {
  padding: 24px 40px;
  background-color: #fafafc;

  h2 {
    font-weight: 700;
    font-size: 35px;
    line-height: 52.5px;
    color: #000000;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #5a607d;
  }
}
</style>
