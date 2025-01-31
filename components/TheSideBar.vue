<script setup lang="ts">
const show = defineModel('show')

const categories = ref([])
</script>

<template>
  <BCollapse :value="show" class="bg-light sidebar" tag="aside">
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 mb-0">Filters</h2>
        <BButton variant="link" class="p-0" @click="$emit('update:show', false)" aria-label="Close filters">
          <i class="bi bi-x-lg"></i>
        </BButton>
      </div>

      <!-- Category Filter -->
      <div class="mb-4">
        <h3 class="h6 mb-2">Category</h3>
        <BFormCheckbox v-model="categories" value="1">Category 1</BFormCheckbox>
        <BFormCheckbox v-model="categories" value="2">Category 2</BFormCheckbox>
        <BFormCheckbox v-model="categories" value="3">Category 3</BFormCheckbox>
      </div>

    </div>
  </BCollapse>
</template>


<style scoped>
.sidebar {
  width: 280px;
}
</style>