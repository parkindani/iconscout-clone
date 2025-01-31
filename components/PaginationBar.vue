<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  lastPage: number;
}>();

const emit = defineEmits<{
  (e: "prev"): void;
  (e: "next"): void;
}>();
</script>

<template>
  <div class="pagination">
    <b-button
      v-if="props.currentPage > 1"
      @click="emit('prev')"
      size="lg"
      variant="outline-primary"
      >Prev page</b-button
    >
    <b-button @click="emit('next')" size="lg" variant="primary" class="next"
      >Next page</b-button
    >
    <div class="page-stauts">
      {{ props.currentPage }} / {{ props.lastPage }} Pages
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  margin-top: 20px;
  column-gap: 15px;

  button.next {
    background-color: #0092e4;
    border-color: #0092e4;
  }

  .page-stauts {
    position: absolute;
    right: 20px;
  }
}
</style>
